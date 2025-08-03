package com.seeder.cashkickservice.service;

import com.seeder.cashkickservice.dto.CashkickContractRequestDto;
import com.seeder.cashkickservice.dto.CashkickContractResponseDto;

import java.util.List;

public interface CashkickContractService {
    List<CashkickContractResponseDto> getAllCashkickContractsByCashkickId(int cashkickId);
    CashkickContractResponseDto createCashkickContract(CashkickContractRequestDto cashkickContractRequestDto);
}
