package com.seeder.userservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "UserFundDashboard")
public class UserFundDashboard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "available_credit")
    private double availableCredit;

    @Column(name = "max_interest_rate")
    private double maxInterestRate;

    @Column(name = "term_length")
    private int termLength;

}