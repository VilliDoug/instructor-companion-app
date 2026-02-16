import { useEffect, useState } from "react";
import { memberService } from "../services/memberService";
import { MemberDTO } from "../types/Member";

export function useMembersList() {

const [members, setMembers] = useState<MemberDTO[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [expandedMemberId, setExpandedMemberId] = useState<number | null>(null);
    const [editingMemberId, setEditingMemberId] = useState<number | null>(null);

     useEffect(() => {
    fetchMembers();
  }, []);

    const fetchMembers = async () => {
        try {
const response = await memberService.getAllMembers();
        setMembers(response.data);
        } catch (error) {
            console.error('Error fetching members:', error);
        }        
  }; 

const filterMembers = useMemo(() => {
    return members.filter((m) => {
        if (!searchTerm) return true;

        const search = searchTerm.toLowerCase();
        return (
            m.name.toLowerCase().includes(search) ||
            m.furigana?.toLowerCase().includes(search) ||
            m.alphabetName?.toLowerCase().includes(search)
        );
    }); 
}, [members, searchTerm]);

  const getMembershipTypeLabel = (type: string) => {
    switch(type) {
        case 'FULL_CLASS': return 'フルクラス';
        case 'EIGHT_DAYS': return '8デイズ';
        case 'FOUR_DAYS': return '4デイズ';
        case 'ON_HIATUS': return '休会中';
        default: return type;
    }
  };

  return {
    members,
    filterMembers,
    searchTerm,
    setSearchTerm,
    expandedMemberId,
    setExpandedMemberId,
    editingMemberId,
    setEditingMemberId,
    getMembershipTypeLabel,
  };
}
