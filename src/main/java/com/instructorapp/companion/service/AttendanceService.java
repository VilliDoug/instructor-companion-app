package com.instructorapp.companion.service;

import com.instructorapp.companion.dto.MemberDTO;
import com.instructorapp.companion.dto.MemberDetailDTO;
import com.instructorapp.companion.entity.Attendance;
import com.instructorapp.companion.entity.Member;
import com.instructorapp.companion.mapper.MemberMapper;
import com.instructorapp.companion.repository.AttendanceRepository;
import com.instructorapp.companion.repository.MemberRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AttendanceService {

  private final MemberRepository memberRepository;
  private final AttendanceRepository attendanceRepository;
  private final MemberMapper memberMapper;
  private final MemberService memberService;

  public AttendanceService(MemberRepository memberRepository, MemberMapper memberMapper, AttendanceRepository attendanceRepository,
      MemberService memberService) {
    this.memberRepository = memberRepository;
    this.attendanceRepository = attendanceRepository;
    this.memberMapper = memberMapper;
    this.memberService = memberService;
  }

  public List<MemberDTO> getTodayAttendance() {
    LocalDate today = LocalDate.now();
    List<Attendance> attendanceList = attendanceRepository.findByAttendanceDate(today);
    List<Member> memberList = attendanceList.stream()
        .map(Attendance::getMember)
        .toList();
    return memberList.stream()
        .map(memberMapper::toDTO)
        .toList();
  }

  @Transactional
  public MemberDetailDTO markAttendance(Long memberId, boolean wasInstructor) {
    Member member = memberRepository.findById(memberId)
        .orElseThrow(() -> new RuntimeException("Member not found"));
    LocalDate today = LocalDate.now();
    List<Attendance> attendanceList = attendanceRepository.findByMemberId(member.getId());
    if (attendanceRepository.existsByMemberIdAndAttendanceDate(memberId, today)) {
      throw new RuntimeException("Member already marked as attended");
    }
    Attendance attendance = new Attendance();
    attendance.setMember(member);
    attendance.setAttendanceDate(today);
    attendance.setWasInstructor(wasInstructor);
    attendanceRepository.save(attendance);
    return memberService.getMemberDetails(memberId);
  }

  public void removeAttendance(Long memberId, LocalDate date) {
    Attendance attendance = attendanceRepository
        .findByMemberIdAndAttendanceDate(memberId, date)
        .orElseThrow(() -> new RuntimeException("Attendance not found"));
    attendanceRepository.delete(attendance);
  }


}
