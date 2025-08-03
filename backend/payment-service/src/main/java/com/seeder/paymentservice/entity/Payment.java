package com.seeder.paymentservice.entity;

import com.seeder.paymentservice.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;


@Entity
@Table(name = "payment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "due_date")
    private Timestamp dueDate;

    @Column(name = "expected_amount")
    private BigDecimal expectedAmount;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    @Column(name = "outstanding_amount")
    private BigDecimal oustandingAmount;

    @Column(name = "user_id")
    private int userId;

}


