package com.seeder.cashkickservice.service;

import com.seeder.cashkickservice.dto.CashkickContractRequestDto;
import com.seeder.cashkickservice.dto.CashkickRequestDto;
import com.seeder.cashkickservice.dto.CashkickResponseDto;
import com.seeder.cashkickservice.entity.Cashkick;
import com.seeder.cashkickservice.exception.NotFoundException;
import com.seeder.cashkickservice.repository.CashkickRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class CashkickServiceImplTest {
    @Mock
    private CashkickRepository cashkickRepository;
    @Mock
    private ModelMapper modelMapper;
    @InjectMocks
    private CashkickServiceImpl cashkickService;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }
    @Test
    void testGetAllCashkicksOfUser() {
        List<Cashkick> cashkickList = new ArrayList<>();
        cashkickList.add(new Cashkick());
        cashkickList.add(new Cashkick());
        when(cashkickRepository.findAllByUserId(1)).thenReturn(cashkickList);
        when(modelMapper.map(any(Cashkick.class), eq(CashkickResponseDto.class)))
                .thenReturn(new CashkickResponseDto());
        List<CashkickResponseDto> results = cashkickService.getAllCashkicksByUserId(1);
        assertNotNull(results);
        assertEquals(2, results.size());
        verify(cashkickRepository, times(1)).findAllByUserId(1);
    }

    @Test
    void testGetAllCashkicksOfUser_NotExists() {
        when(cashkickRepository.findAllByUserId(1)).thenReturn(null);
        NotFoundException exception = Assertions.assertThrows(NotFoundException.class,
                () -> cashkickService.getAllCashkicksByUserId(1));
        assertEquals("An error occurred while fetching all cashkicks of user" ,exception.getMessage());
    }

    @Test
    void testCreateNewCashkick(){
        Cashkick cashkick = new Cashkick();
        cashkick.setName("My First Advance");
        CashkickResponseDto cashkickResponseDto = new CashkickResponseDto();
        cashkickResponseDto.setName("My First Advance");
        cashkickResponseDto.setId(1);

        when(cashkickRepository.save(any())).thenReturn(cashkick);
        when(modelMapper.map(cashkick, CashkickResponseDto.class)).thenReturn(cashkickResponseDto);
        CashkickResponseDto cashkickResponseDto1 = cashkickService.createCashkick(new CashkickRequestDto());
        assertEquals(cashkickResponseDto1.getName(),cashkick.getName());
    }
    @Test
    void testCreateNewCashkick_Fails(){
        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            when(cashkickRepository.save(any())).thenThrow(new NotFoundException("Error creating cashkick"));
            cashkickService.createCashkick(new CashkickRequestDto());
        });

        assertEquals("Error creating cashkick", exception.getMessage());
    }
}
