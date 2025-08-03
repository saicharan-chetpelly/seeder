package com.seeder.cashkickservice.controller;

import com.seeder.cashkickservice.dto.CashkickContractRequestDto;
import com.seeder.cashkickservice.dto.CashkickContractResponseDto;
import com.seeder.cashkickservice.service.CashkickContractService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class CashkickContractControllerTest {
    @Mock
    private CashkickContractService cashkickContractService;
    @InjectMocks
    private CashkickContractController cashkickContractController;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetAllCashkickContractsByCashkickId(){
        int cashkickId = 1;
        List<CashkickContractResponseDto> cashkickContractResponseDtoList = new ArrayList<>();
        CashkickContractResponseDto cashkickContractResponseDto = new CashkickContractResponseDto();
        cashkickContractResponseDto.setCashkickId(cashkickId);
        cashkickContractResponseDto.setContractId(1);
        cashkickContractResponseDto.setId(1);
        cashkickContractResponseDtoList.add(cashkickContractResponseDto);
        when(cashkickContractService.getAllCashkickContractsByCashkickId(cashkickId)).thenReturn(cashkickContractResponseDtoList);
        ResponseEntity<List<CashkickContractResponseDto>> response = cashkickContractController.getAllCashkickContractsByCashkickId(cashkickId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(cashkickContractResponseDtoList, response.getBody());
    }

    @Test
    void testGetAllCashkickContractsByCashkickId_NotExists(){
        int cashkickId = 1;
        List<CashkickContractResponseDto> cashkickContractResponseDtoList = new ArrayList<>();
        when(cashkickContractService.getAllCashkickContractsByCashkickId(cashkickId)).thenReturn(cashkickContractResponseDtoList);
        ResponseEntity<List<CashkickContractResponseDto>> response = cashkickContractController.getAllCashkickContractsByCashkickId(cashkickId);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(cashkickContractResponseDtoList, response.getBody());
    }

    @Test
    void testCreateNewCashkickContract(){
        CashkickContractRequestDto cashkickContractRequestDto = new CashkickContractRequestDto();
        CashkickContractResponseDto cashkickContractResponseDto = new CashkickContractResponseDto();
        cashkickContractRequestDto.setCashkickId(1);
        cashkickContractRequestDto.setContractId(1);
        cashkickContractResponseDto.setContractId(cashkickContractRequestDto.getContractId());
        cashkickContractResponseDto.setContractId(cashkickContractRequestDto.getContractId());
        when(cashkickContractService.createCashkickContract(cashkickContractRequestDto)).thenReturn(cashkickContractResponseDto);
        ResponseEntity<CashkickContractResponseDto> responseDtoResponseEntity = cashkickContractController.createCashkickContract(cashkickContractRequestDto);
        assertEquals(HttpStatus.CREATED, responseDtoResponseEntity.getStatusCode());
        assertEquals(cashkickContractResponseDto, responseDtoResponseEntity.getBody());
    }
}
