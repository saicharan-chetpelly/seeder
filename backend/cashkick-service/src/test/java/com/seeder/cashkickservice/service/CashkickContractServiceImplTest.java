package com.seeder.cashkickservice.service;

import com.seeder.cashkickservice.dto.CashkickContractRequestDto;
import com.seeder.cashkickservice.dto.CashkickContractResponseDto;
import com.seeder.cashkickservice.entity.CashkickContract;
import com.seeder.cashkickservice.exception.NotFoundException;
import com.seeder.cashkickservice.repository.CashkickContractRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

class CashkickContractServiceImplTest {
    @Mock
    private CashkickContractRepository cashkickContractRepository;
    @Mock
    private ModelMapper modelMapper;
    @InjectMocks
    private CashkickContractServiceImpl cashkickContractService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }
    @Test
    void testGetAllCashkickContractByCashkickId() {
        List<CashkickContract> cashkickContractList = new ArrayList<>();
        cashkickContractList.add(new CashkickContract());
        cashkickContractList.add(new CashkickContract());
        when(cashkickContractRepository.findAllByCashkickId(1)).thenReturn(cashkickContractList);
        when(modelMapper.map(any(CashkickContract.class), eq(CashkickContractResponseDto.class)))
                .thenReturn(new CashkickContractResponseDto());
        List<CashkickContractResponseDto> results = cashkickContractService.getAllCashkickContractsByCashkickId(1);
        assertNotNull(results);
        assertEquals(2, results.size());
        verify(cashkickContractRepository, times(1)).findAllByCashkickId(1);
    }

    @Test
    void testGetAllCashkickContractsByCashkickId_NotExists() {
        when(cashkickContractRepository.findAllByCashkickId(1)).thenReturn(null);
        NotFoundException exception = Assertions.assertThrows(NotFoundException.class,
                () -> cashkickContractService.getAllCashkickContractsByCashkickId(1));
        assertEquals("Error fetching cashkick contracts of user" ,exception.getMessage());
    }

    @Test
    void testCreateNewCashkickContract(){
        CashkickContract cashkickContract = new CashkickContract();
        cashkickContract.setCashkickId(1);
        CashkickContractResponseDto cashkickContractResponseDto = new CashkickContractResponseDto();
        cashkickContractResponseDto.setCashkickId(1);
        cashkickContractResponseDto.setId(1);

        when(cashkickContractRepository.save(any())).thenReturn(cashkickContract);
        when(modelMapper.map(cashkickContract, CashkickContractResponseDto.class)).thenReturn(cashkickContractResponseDto);
        CashkickContractResponseDto cashkickContractResponseDto1 = cashkickContractService.createCashkickContract(new CashkickContractRequestDto());
        assertEquals(cashkickContractResponseDto1.getCashkickId(),cashkickContract.getCashkickId());
    }
    @Test
    void testCreateNewCashkick_Fails(){
        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            when(cashkickContractRepository.save(any())).thenThrow(new NotFoundException("Error creating cashkick contract"));
            cashkickContractService.createCashkickContract(new CashkickContractRequestDto());
        });

        assertEquals("Error creating cashkick contract", exception.getMessage());
    }
}
