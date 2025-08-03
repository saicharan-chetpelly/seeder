package com.seeder.cashkickservice.dto;

import com.seeder.cashkickservice.enums.CashkickStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CashkickResponseDto {
    private int id;
    private String name;
    private Timestamp maturity;
    private BigDecimal totalFinanced;
    private CashkickStatus status;
    private BigDecimal totalReceived;
    private int userId;
}
