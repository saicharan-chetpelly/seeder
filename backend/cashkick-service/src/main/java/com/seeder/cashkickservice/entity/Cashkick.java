package com.seeder.cashkickservice.entity;

import com.seeder.cashkickservice.enums.CashkickStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "cashkick")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cashkick {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "maturity_date")
    private Timestamp maturity;

    @Column(name = "total_financed")
    private BigDecimal totalFinanced;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private CashkickStatus status;

    @Column(name = "total_received")
    private BigDecimal totalReceived;

    @Column(name = "user_id")
    private int userId;
}
