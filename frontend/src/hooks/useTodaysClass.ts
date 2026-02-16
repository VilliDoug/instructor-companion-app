import { useEffect, useState } from "react";
import { MemberDTO } from "../types/Member";
import { memberService } from "../services/memberService";
import { attendanceService } from "../services/attendanceService";

export function useTodaysClass() {
    const [allMembers, setAllMembers] = useState<MemberDTO[]>([]);
    const [attendedMembers, setAttendedMembers] = useState<MemberDTO[]>([]);
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

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

        markAttendance(memberId);
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

    const handleRemoveAttendance = async (memberId: number) => {
        // TODO implement
    };

    return {
        allMembers,
        attendedMembers,
        selectedMemberId,
        handleCardClick,
        handleRemoveAttendance,
    };
}