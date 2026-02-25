import api from "../api";
import { MemberDetailDTO, MemberDTO } from "../types/Member";

export const attendanceService = {
    markAttendance: (memberId: number, wasInstructor: boolean = false) =>
        api.post<MemberDetailDTO>(`/members/${memberId}/attendance`, null, {
            params: {wasInstructor}
        }),
    getTodayAttendance: () =>
        api.get<MemberDTO[]>('/attendance/today'),
    removeAttendance: (memberId: number, date: string) =>
        api.delete(`/attendance`, {params: { memberId, date } }),
};