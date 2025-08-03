package com.seeder.cashkickservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "contractCashkickMap")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CashkickContract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "cashkick_id")
    private int cashkickId;

    @Column(name = "contract_id")
    private int contractId;
}
