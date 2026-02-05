package com.instructorapp.companion.repository;

import com.instructorapp.companion.entity.Attendance;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
  List<Attendance> findByMemberId(Long id);

}
