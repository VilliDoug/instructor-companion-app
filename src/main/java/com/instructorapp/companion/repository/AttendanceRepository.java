package com.instructorapp.companion.repository;

import com.instructorapp.companion.entity.Attendance;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
  List<Attendance> findByMemberId(Long id);
  boolean existsByMemberIdAndAttendanceDate(Long memberId, LocalDate date);
  Optional<Attendance> findByMemberIdAndAttendanceDate(Long memberId, LocalDate date);
  List<Attendance> findByAttendanceDate(LocalDate date);
}
