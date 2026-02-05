package com.instructorapp.companion.controller;

import com.instructorapp.companion.dto.MemberDTO;
import com.instructorapp.companion.dto.MemberDetailDTO;
import com.instructorapp.companion.service.MemberService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/members")
public class MemberController {

  private MemberService memberService;

  public MemberController(MemberService memberService) {
    this.memberService = memberService;
  }

  @GetMapping
  public ResponseEntity<List<MemberDTO>> getAllMembers() {
    List<MemberDTO> members = memberService.getAllMembers();
    return ResponseEntity.ok(members);
  }

  @GetMapping("/{id}/details")
  public ResponseEntity<MemberDetailDTO> getMemberDetails(@PathVariable Long id) {
    MemberDetailDTO details = memberService.getMemberDetails(id);
    return ResponseEntity.ok(details);
  }

}
