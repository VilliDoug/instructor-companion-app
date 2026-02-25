import { useEffect, useMemo, useState } from "react";
import { MemberDTO } from "../types/Member";
import { memberService } from "../services/memberService";
import { attendanceService } from "../services/attendanceService";

export function useTodaysClass() {
    const [allMembers, setAllMembers] = useState<MemberDTO[]>([]);
    const [attendedMembers, setAttendedMembers] = useState<MemberDTO[]>([]);
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const membersResponse = await memberService.getAllMembers();
            const activeMembers = await membersResponse.data.filter(m => m.active);
            setAllMembers(activeMembers);

            const attendanceResponse = await attendanceService.getTodayAttendance();
            setAttendedMembers(attendanceResponse.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const handleCardClick = (memberId: number) => {
        const hasAttended = attendedMembers.some(m => m.id === memberId);
        if (hasAttended) return;

        if (selectedMemberId !== memberId) {
            setSelectedMemberId(memberId);
            return;
        }
    };

    const markAttendance = async (memberId: number, isInstructor: boolean = false) => {
        try {
            await attendanceService.markAttendance(memberId, isInstructor);
            await fetchData();
            setSelectedMemberId(null);
            setToast({ message: '出席登録完了！', type: 'success'});
        } catch (error) {
            console.error('Error marking attendance:', error);
            setToast({ message: '出席登録に失敗しました', type: 'error'});
        }
    };

    const handleAttendClick = async (memberId: number, e: React.MouseEvent, isInstructor: boolean = false) => {
        e.stopPropagation();
        await markAttendance(memberId, isInstructor);
    }

    const handleRemoveAttendance = async (memberId: number) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            await attendanceService.removeAttendance(memberId, today);
            await fetchData();  
             setToast({ message: '出席を削除しました', type: 'success'});          
        } catch (error) {
            console.error('Error removing attendance', error);
            setToast({ message: '削除に失敗しました', type: 'error'});
        }
    };

    const [selectedInstructor, setSelectedInstructor] = useState<number | null>(null);

    const staffMembers = allMembers.filter(m => m.staff);

    const filterMembers = useMemo(() => {
        return allMembers.filter((m) => {
            if (!searchTerm) return true;

            const search = searchTerm.toLowerCase();
            return (
                m.name.toLowerCase().includes(search) ||
                m.furigana?.toLowerCase().includes(search) ||
                m.alphabetName?.toLowerCase().includes(search)
            );
        })
    }, [allMembers, searchTerm]);

    return {
        allMembers,
        attendedMembers,
        selectedMemberId,
        handleCardClick,
        handleRemoveAttendance,
        handleAttendClick,
        filterMembers,
        staffMembers,
        selectedInstructor,
        setSelectedInstructor,
        searchTerm,
        setSearchTerm,
        toast,
        setToast,
    };
}