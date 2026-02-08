package com.instructorapp.companion.controller;

import com.instructorapp.companion.dto.MemberDTO;
import com.instructorapp.companion.service.AttendanceService;
import com.instructorapp.companion.service.MemberService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

  private MemberService memberService;
  private AttendanceService attendanceService;

  public AttendanceController(MemberService memberService, AttendanceService attendanceService) {
    this.memberService = memberService;
    this.attendanceService = attendanceService;
  }

  @GetMapping("/today")
  public ResponseEntity<List<MemberDTO>> getTodayAttendance() {
    return ResponseEntity.ok(attendanceService.getTodayAttendance());
  }

//  @DeleteMapping("/api/attendance/{attendanceId}")
//  @GetMapping("/api/attendance?date=yyyy-mm-dd")
//  @GetMapping("/api/attendance/summary?month=yyyy-mm")

}
