package com.seeder.cashkickservice.controller;

import com.seeder.cashkickservice.dto.CashkickRequestDto;
import com.seeder.cashkickservice.dto.CashkickResponseDto;
import com.seeder.cashkickservice.service.CashkickService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cashkick")
public class CashkickController {

    private CashkickService cashkickService;

    public CashkickController(CashkickService cashkickService) {
        this.cashkickService = cashkickService;
    }

    @GetMapping
    public ResponseEntity<List<CashkickResponseDto>> getAllCashkicksByUserId(@RequestParam ("userId") int userId){
        List<CashkickResponseDto> cashkickResponseDtoList = cashkickService.getAllCashkicksByUserId(userId);
        return new ResponseEntity<>(cashkickResponseDtoList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CashkickResponseDto> createCashkick(@RequestBody CashkickRequestDto cashkickRequestDto){
        CashkickResponseDto cashkickResponseDto = cashkickService.createCashkick(cashkickRequestDto);
        return new ResponseEntity<>(cashkickResponseDto, HttpStatus.CREATED);
    }
}
