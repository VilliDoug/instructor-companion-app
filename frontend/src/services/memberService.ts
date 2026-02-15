import api from "../api";
import { MemberDetailDTO, MemberDTO } from "../types/Member";

export const memberService = {
    getAllMembers: () =>
        api.get<MemberDTO[]>('/members'),
    getMemberDetails: (id: number) =>
        api.get<MemberDetailDTO>(`/members/${id}/details`),
    createMember: (member: MemberDTO) =>
        api.post<MemberDTO>('/members', member),
    updateMember: (id: number, member: MemberDTO) =>
        api.put<MemberDTO>(`/members/${id}`, member),
    deleteMember: (id: number) =>
        api.delete<MemberDTO>(`/members/${id}`),
};