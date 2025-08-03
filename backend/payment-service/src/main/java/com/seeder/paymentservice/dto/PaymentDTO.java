package com.seeder.paymentservice.dto;

import com.seeder.paymentservice.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {

    private int userId;
    private Timestamp dueDate;
    private PaymentStatus status;
    private BigDecimal expectedAmount;
    private BigDecimal oustandingAmount;

}


