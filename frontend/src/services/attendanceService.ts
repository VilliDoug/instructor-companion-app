import api from "../api";
import { MemberDetailDTO, MemberDTO } from "../types/Member";

export const attendanceService = {
    markAttendance: (memberId: number) =>
        api.post<MemberDetailDTO>(`/members/${memberId}/attendance`),
    getTodayAttendance: () =>
        api.get<MemberDTO[]>('/attendance/today'),
    removeAttendance: (memberId: number, date: string) =>
        api.delete(`/attendance`, {params: { memberId, date } }),
};