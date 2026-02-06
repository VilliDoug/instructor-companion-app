package com.instructorapp.companion.dto;

import com.instructorapp.companion.enums.BeltRank;
import com.instructorapp.companion.enums.MembershipType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
    private Long id;
    @NotBlank(message = "Name is required")
    private String name;
    private String furigana;
    private LocalDate dateOfBirth;
    private String phone;
    @NotBlank(message = "LINE ID is required")
    private String lineId;
    @Email(message = "Invalid email format")
    private String email;
    private String photoUrl;
    private BeltRank beltRank;
    @NotNull(message = "Membership type is required")
    private MembershipType membershipType;
    private boolean paymentStatus;
    private boolean isActive;
    private LocalDate joinedAt;
    private LocalDate updatedAt;
}
