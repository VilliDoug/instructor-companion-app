export interface MemberDTO {
    id: number;
    name: string;
    furigana: string;
    alphabetName: string;
    dateOfBirth: string;
    phone: string;
    lineId: string;
    email: string;
    photoUrl: string;
    beltRank: 'WHITE' | 'BLUE' | 'PURPLE' | 'BROWN' | 'BLACK';
    membershipType: 'FULL_CLASS' | 'EIGHT_DAYS' | 'FOUR_DAYS' | 'ON_HIATUS';
    staff: boolean;
    paymentStatus: boolean;
    active: boolean;
    joinedAt: string;
    updatedAt: string;
}

export interface MemberDetailDTO {
    id: number;
    name: string;
    alphabetName: string;
    membershipType: 'FULL_CLASS' | 'EIGHT_DAYS' | 'FOUR_DAYS' | 'ON_HIATUS';
    paymentStatus: boolean;
    active: boolean;
    attendanceDates: string[];
    attendanceThisMonth: number;
    overCount: boolean;
}