package com.instructorapp.companion.controller;

import com.instructorapp.companion.dto.MemberDTO;
import com.instructorapp.companion.dto.MemberDetailDTO;
import com.instructorapp.companion.service.AttendanceService;
import com.instructorapp.companion.service.MemberService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

  private MemberService memberService;
  private AttendanceService attendanceService;

  public MemberController(MemberService memberService, AttendanceService attendanceService) {
    this.memberService = memberService;
    this.attendanceService = attendanceService;
  }

  @GetMapping
  public ResponseEntity<List<MemberDTO>> getMembers(@RequestParam(required = false) Boolean active) {
    if (active != null && active) {
      return ResponseEntity.ok(memberService.getActiveMembers());
    }
    return ResponseEntity.ok(memberService.getAllMembers());
  }

  @GetMapping("/{id}/details")
  public ResponseEntity<MemberDetailDTO> getMemberDetails(@PathVariable Long id) {
    return ResponseEntity.ok(memberService.getMemberDetails(id));
  }

  @PostMapping
  public ResponseEntity<MemberDTO> createMember(@Valid @RequestBody MemberDTO memberDTO) {
    return ResponseEntity.status(HttpStatus.CREATED).body(memberService.createMember(memberDTO));
  }

  @PutMapping("/{id}")
  public ResponseEntity<MemberDTO> updateMember(@PathVariable Long id, @Valid @RequestBody MemberDTO memberDTO) {
    return ResponseEntity.ok(memberService.updateMember(id, memberDTO));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<MemberDTO> deleteMember(@PathVariable Long id) {
    return ResponseEntity.ok(memberService.deleteMember(id));
  }

  @PostMapping("/{id}/attendance")
  public ResponseEntity<MemberDetailDTO> markAttendance(
      @PathVariable Long id,
      @RequestParam(required = false, defaultValue = "false") boolean wasInstructor
  ) {
    return ResponseEntity.status(HttpStatus.CREATED).body(attendanceService.markAttendance(id, wasInstructor));
  }

}
