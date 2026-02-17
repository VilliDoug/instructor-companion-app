import { useEffect, useMemo, useState } from "react";
import { MemberDTO } from "../types/Member";
import { memberService } from "../services/memberService";
import { attendanceService } from "../services/attendanceService";

export function useTodaysClass() {
    const [allMembers, setAllMembers] = useState<MemberDTO[]>([]);
    const [attendedMembers, setAttendedMembers] = useState<MemberDTO[]>([]);
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

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

    const markAttendance = async (memberId: number) => {
        try {
            await attendanceService.markAttendance(memberId);
            await fetchData();
            setSelectedMemberId(null);
        } catch (error) {
            console.error('Error marking attendance:', error);
            alert('出席登録に失敗しました');
        }
    };

    const handleAttendClick = async (memberId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        await markAttendance(memberId);
    }

    const handleRemoveAttendance = async (memberId: number) => {
        try {
            const today = new Date().toISOString().split('T')[0];
            await attendanceService.removeAttendance(memberId, today);
            await fetchData();            
        } catch (error) {
            console.error('Error removing attendance', error);
            alert('出席の削除に失敗しました');
        }
    };

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
        searchTerm,
        setSearchTerm,
    };
}