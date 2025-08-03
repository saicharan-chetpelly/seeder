package com.seeder.cashkickservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class CashkickRequestDto {
    private String name;
    private BigDecimal totalFinanced;
    private BigDecimal totalReceived;
    private int userId;
}
