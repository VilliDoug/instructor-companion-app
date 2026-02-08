package com.instructorapp.companion.controller;

import com.instructorapp.companion.dto.MemberDTO;
import com.instructorapp.companion.dto.MemberDetailDTO;
import com.instructorapp.companion.service.MemberService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

  @PostMapping
  public ResponseEntity<MemberDTO> createMember(@Valid @RequestBody MemberDTO memberDTO) {
    MemberDTO created = memberService.createMember(memberDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @PutMapping("/{id}")
  public ResponseEntity<MemberDTO> updateMember(@PathVariable Long id, @Valid @RequestBody MemberDTO memberDTO) {
    MemberDTO updated = memberService.updateMember(id, memberDTO);
    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<MemberDTO> deleteMember(@PathVariable Long id) {
    MemberDTO deleted = memberService.deleteMember(id);
    return ResponseEntity.ok(deleted);
  }

}
