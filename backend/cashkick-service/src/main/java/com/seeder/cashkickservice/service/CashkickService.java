package com.seeder.cashkickservice.service;


import com.seeder.cashkickservice.dto.CashkickRequestDto;
import com.seeder.cashkickservice.dto.CashkickResponseDto;

import java.util.List;

public interface CashkickService {
    List<CashkickResponseDto> getAllCashkicksByUserId(int userId);
    CashkickResponseDto createCashkick(CashkickRequestDto cashkickRequestDto);
}
