package com.seeder.userservice.service;

import com.seeder.userservice.dto.UserFundDashboardDTO;

public interface UserFundDashboardService {
    UserFundDashboardDTO save(UserFundDashboardDTO userFundDashboardDTO);

    UserFundDashboardDTO getUserById(int id);
}
