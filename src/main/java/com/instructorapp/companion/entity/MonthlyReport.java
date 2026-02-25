package com.instructorapp.companion.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class MonthlyReport {
    @Id
    private long id;
    private int year;
    private int month;
    private LocalDate closedDate;
    private int totalClassesHeld;
    private boolean closed;
}