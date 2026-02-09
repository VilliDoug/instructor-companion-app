package com.instructorapp.companion.controller;

import com.instructorapp.companion.dto.MemberDTO;
import com.instructorapp.companion.service.AttendanceService;
import com.instructorapp.companion.service.MemberService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173")
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

  @DeleteMapping
  public ResponseEntity<Void> removeAttendance(
      @RequestParam Long memberId,
      @RequestParam @DateTimeFormat(iso = ISO.DATE) LocalDate date
  ) {
    attendanceService.removeAttendance(memberId, date);
    return ResponseEntity.noContent().build();
  }


//  @DeleteMapping("/api/attendance/{attendanceId}")
//  @GetMapping("/api/attendance?date=yyyy-mm-dd")
//  @GetMapping("/api/attendance/summary?month=yyyy-mm")

}
