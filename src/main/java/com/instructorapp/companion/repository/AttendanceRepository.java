package com.instructorapp.companion.repository;

import com.instructorapp.companion.entity.Attendance;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
  List<Attendance> findByMemberId(Long id);

  boolean existsByMemberIdAndAttendanceDate(Long memberId, LocalDate date);

  Optional<Attendance> findByMemberIdAndAttendanceDate(Long memberId, LocalDate date);

  List<Attendance> findByAttendanceDate(LocalDate date);

  @Query("SELECT a.member, COUNT(a) FROM Attendance a " +
  "WHERE a.wasInstructor = true " +
  "AND a.attendanceDate BETWEEN :startDate AND :endDate " +
  "GROUP BY a.member")
  List<Object[]> getInstructorClassCounts(
      @Param("startDate") LocalDate startDate,
      @Param("endDate") LocalDate endDate
  );
}
