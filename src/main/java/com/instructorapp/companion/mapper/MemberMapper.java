package com.instructorapp.companion.mapper;

import com.instructorapp.companion.dto.MemberDTO;
import com.instructorapp.companion.entity.Member;
import org.springframework.stereotype.Component;

@Component
public class MemberMapper {

  public Member toEntity(MemberDTO dto) {
    Member member = new Member();
    member.setName(dto.getName());
    member.setFurigana(dto.getFurigana());
    member.setAlphabetName(dto.getAlphabetName());
    member.setDateOfBirth(dto.getDateOfBirth());
    member.setPhone(dto.getPhone());
    member.setLineId(dto.getLineId());
    member.setEmail(dto.getEmail());
    member.setPhotoUrl(dto.getPhotoUrl());
    member.setBeltRank(dto.getBeltRank());
    member.setMembershipType(dto.getMembershipType());
    member.setStaff(dto.isStaff());
    member.setPaymentStatus(dto.isPaymentStatus());
    member.setActive(dto.isActive());
    return member;
  }

  public MemberDTO toDTO(Member member) {
    MemberDTO dto = new MemberDTO();
    dto.setId(member.getId());
    dto.setName(member.getName());
    dto.setFurigana(member.getFurigana());
    dto.setAlphabetName(member.getAlphabetName());
    dto.setDateOfBirth(member.getDateOfBirth());
    dto.setPhone(member.getPhone());
    dto.setLineId(member.getLineId());
    dto.setEmail(member.getEmail());
    dto.setPhotoUrl(member.getPhotoUrl());
    dto.setBeltRank(member.getBeltRank());
    dto.setMembershipType(member.getMembershipType());
    dto.setStaff(member.isStaff());
    dto.setPaymentStatus(member.isPaymentStatus());
    dto.setActive(member.isActive());
    dto.setJoinedAt(member.getJoinedAt());
    dto.setUpdatedAt(member.getUpdatedAt());
    return dto;
  }

}
