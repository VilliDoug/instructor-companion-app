package com.instructorapp.companion.service;

import com.instructorapp.companion.dto.MemberDTO;
import com.instructorapp.companion.dto.MemberDetailDTO;
import com.instructorapp.companion.entity.Attendance;
import com.instructorapp.companion.entity.Member;
import com.instructorapp.companion.enums.MembershipType;
import com.instructorapp.companion.repository.AttendanceRepository;
import com.instructorapp.companion.repository.MemberRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

  private final MemberRepository memberRepository;

  private final AttendanceRepository attendanceRepository;

  public MemberService(MemberRepository memberRepository, AttendanceRepository attendanceRepository) {
    this.memberRepository = memberRepository;
    this.attendanceRepository = attendanceRepository;
  }

  public List<MemberDTO> getAllMembers() {
    List<Member> members = memberRepository.findAll();
    return members.stream()
        .map(this::convertToMemberDTO)
        .toList();
  }

  private MemberDTO convertToMemberDTO(Member member) {
    MemberDTO dto = new MemberDTO();
    dto.setId(member.getId());
    dto.setName(member.getName());
    dto.setFurigana(member.getFurigana());
    dto.setDateOfBirth(member.getDateOfBirth());
    dto.setPhone(member.getPhone());
    dto.setEmail(member.getEmail());
    dto.setPhotoUrl(member.getPhotoUrl());
    dto.setBeltRank(member.getBeltRank());
    dto.setMembershipType(member.getMembershipType());
    dto.setPaymentStatus(member.isPaymentStatus());
    dto.setActive(member.isActive());
    dto.setJoinedAt(member.getJoinedAt());
    dto.setUpdatedAt(member.getUpdatedAt());
    return dto;
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
    dto.setMembershipType(member.getMembershipType());
    dto.setPaymentStatus(member.isPaymentStatus());
    dto.setAttendanceDates(attendancesThisMonth.stream()
        .map(Attendance::getAttendanceDate)
        .toList());
    dto.setAttendanceThisMonth(count);
    dto.setOverCount(isOver);
    return dto;

  }
}
