package com.instructorapp.companion.dto;

import com.instructorapp.companion.enums.MembershipType;
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
  private String name;
  private MembershipType membershipType;
  private boolean paymentStatus;
  private List<LocalDate> attendanceDates;
  private int attendanceThisMonth;
  private boolean overCount;
}
