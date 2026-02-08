package com.instructorapp.companion.service;

import com.instructorapp.companion.dto.MemberDTO;
import com.instructorapp.companion.dto.MemberDetailDTO;
import com.instructorapp.companion.entity.Attendance;
import com.instructorapp.companion.entity.Member;
import com.instructorapp.companion.enums.MembershipType;
import com.instructorapp.companion.mapper.MemberMapper;
import com.instructorapp.companion.repository.AttendanceRepository;
import com.instructorapp.companion.repository.MemberRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {

  private final MemberRepository memberRepository;
  private final MemberMapper memberMapper;
  private final AttendanceRepository attendanceRepository;

  public MemberService(MemberRepository memberRepository, MemberMapper memberMapper, AttendanceRepository attendanceRepository) {
    this.memberRepository = memberRepository;
    this.memberMapper = memberMapper;
    this.attendanceRepository = attendanceRepository;
  }

  public List<MemberDTO> getAllMembers() {
    List<Member> members = memberRepository.findAll();
    return members.stream()
        .map(memberMapper::toDTO)
        .toList();
  }

  public MemberDetailDTO getMemberDetails(Long id) {
    Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found"));
    List<Attendance> attendanceList = attendanceRepository.findByMemberId(id);
    LocalDate now = LocalDate.now();
    int currentMonth = now.getMonthValue();
    int currentYear = now.getYear();
    List<Attendance> attendancesThisMonth = new ArrayList<>();
    for (Attendance attendance : attendanceList) {
      if (attendance.getAttendanceDate().getMonthValue() == currentMonth
      && attendance.getAttendanceDate().getYear() == currentYear) {
        attendancesThisMonth.add(attendance);
      }
    }
    int count = attendancesThisMonth.size();
    boolean isOver = false;
    if (member.getMembershipType().equals(MembershipType.FOUR_DAYS) && count > 4) {
      isOver = true;
    } else if (member.getMembershipType().equals(MembershipType.EIGHT_DAYS) && count > 8) {
      isOver = true;
    }
    MemberDetailDTO dto = new MemberDetailDTO();
    dto.setId(member.getId());
    dto.setName(member.getName());
    dto.setAlphabetName(member.getAlphabetName());
    dto.setMembershipType(member.getMembershipType());
    dto.setPaymentStatus(member.isPaymentStatus());
    dto.setActive(member.isActive());
    dto.setAttendanceDates(attendancesThisMonth.stream()
        .map(Attendance::getAttendanceDate)
        .toList());
    dto.setAttendanceThisMonth(count);
    dto.setOverCount(isOver);
    return dto;
  }

  @Transactional
  public MemberDTO createMember(MemberDTO memberDTO) {
    Member member = memberMapper.toEntity(memberDTO);
    Member savedMember = memberRepository.save(member);
    return memberMapper.toDTO(savedMember);
  }

  @Transactional
  public MemberDTO updateMember(Long id, MemberDTO dto) {
    Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found"));
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
    Member updatedMember = memberRepository.save(member);
    return memberMapper.toDTO(updatedMember);
  }

  @Transactional
  public MemberDTO deleteMember(Long id) {
    Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member not found"));
    member.setActive(false);
    Member deletedMember = memberRepository.save(member);
    return memberMapper.toDTO(deletedMember);
  }
}