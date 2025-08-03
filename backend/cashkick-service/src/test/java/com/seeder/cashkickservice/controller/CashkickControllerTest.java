package com.seeder.cashkickservice.controller;

import com.seeder.cashkickservice.dto.CashkickRequestDto;
import com.seeder.cashkickservice.dto.CashkickResponseDto;
import com.seeder.cashkickservice.service.CashkickService;
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

class CashkickControllerTest {
    @Mock
    private CashkickService cashkickService;
    @InjectMocks
    private CashkickController cashkickController;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetCashkickByUserId(){
        int userId = 1;
        List<CashkickResponseDto> cashkickResponseDtoList = new ArrayList<>();
        CashkickResponseDto cashkickResponseDto = new CashkickResponseDto();
        cashkickResponseDto.setName("First advance");
        cashkickResponseDto.setUserId(userId);
        cashkickResponseDtoList.add(cashkickResponseDto);
        when(cashkickService.getAllCashkicksByUserId(userId)).thenReturn(cashkickResponseDtoList);
        ResponseEntity<List<CashkickResponseDto>> response = cashkickController.getAllCashkicksByUserId(userId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(cashkickResponseDtoList, response.getBody());
    }

    @Test
    void testCreateNewCashkick(){
        CashkickRequestDto cashkickRequestDto = new CashkickRequestDto();
        CashkickResponseDto cashkickResponseDto = new CashkickResponseDto();
        cashkickRequestDto.setName("First advance");
        cashkickRequestDto.setUserId(1);
        cashkickResponseDto.setName(cashkickRequestDto.getName());
        cashkickResponseDto.setUserId(cashkickRequestDto.getUserId());
        when(cashkickService.createCashkick(cashkickRequestDto)).thenReturn(cashkickResponseDto);
        ResponseEntity<CashkickResponseDto> responseDtoResponseEntity = cashkickController.createCashkick(cashkickRequestDto);
        assertEquals(HttpStatus.CREATED, responseDtoResponseEntity.getStatusCode());
        assertEquals(cashkickResponseDto, responseDtoResponseEntity.getBody());
    }
}
