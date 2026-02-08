package com.instructorapp.companion.dto;

import com.instructorapp.companion.enums.MembershipType;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 会員詳細情報
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDetailDTO {
  private Long id;
  @NotBlank(message = "Name is required")
  private String name;
  private String alphabetName;
  @NotBlank(message = "Membership type is required")
  private MembershipType membershipType;
  private boolean paymentStatus;
  private boolean active;
  private List<LocalDate> attendanceDates;
  private int attendanceThisMonth;
  private boolean overCount;
}
