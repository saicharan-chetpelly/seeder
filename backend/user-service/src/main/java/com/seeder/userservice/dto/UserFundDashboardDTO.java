package com.seeder.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserFundDashboardDTO {
    private int id;
    private double availableCredit;
    private double maxInterestRate;
    private int termLength;

}
