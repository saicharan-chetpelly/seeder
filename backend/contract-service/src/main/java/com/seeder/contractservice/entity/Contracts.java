package com.seeder.contractservice.entity;

import com.seeder.contractservice.enums.Status;
import com.seeder.contractservice.enums.Type;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "contract")
@Getter
@Setter
public class Contracts {
    @Id
    @Column(name = "id")
    private Integer id;
    @Column(name = "name")
    private String contractName;
    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private Type type;
    @Column(name = "installment")
    private double perPayment;
    @Column(name = "total_financed")
    private double totalFinancied;
    @Column(name = "total_avilable")
    private double totalAvailable;
    @Column(name = "term_length")
    private Integer termLength;
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;
    @Column(name = "rate_of_interest")
    private double rate_of_interest;

}
