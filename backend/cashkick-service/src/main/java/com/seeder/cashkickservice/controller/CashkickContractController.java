package com.seeder.cashkickservice.controller;

import com.seeder.cashkickservice.dto.CashkickContractRequestDto;
import com.seeder.cashkickservice.dto.CashkickContractResponseDto;
import com.seeder.cashkickservice.service.CashkickContractService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cashkickContract")
public class CashkickContractController {
    private CashkickContractService cashkickContractService;

    public CashkickContractController(CashkickContractService cashkickContractService) {
        this.cashkickContractService = cashkickContractService;
    }

    @GetMapping
    public ResponseEntity<List<CashkickContractResponseDto>> getAllCashkickContractsByCashkickId(@RequestParam("cashkickId") int cashkickId){
        List<CashkickContractResponseDto> cashkickContractResponseDtoList = cashkickContractService.getAllCashkickContractsByCashkickId(cashkickId);
        if(cashkickContractResponseDtoList.isEmpty()){
            return new ResponseEntity<>(cashkickContractResponseDtoList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cashkickContractResponseDtoList, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CashkickContractResponseDto> createCashkickContract(@RequestBody CashkickContractRequestDto cashkickContractRequestDto){
        CashkickContractResponseDto cashkickContractResponseDto = cashkickContractService.createCashkickContract(cashkickContractRequestDto);
        return new ResponseEntity<>(cashkickContractResponseDto,HttpStatus.CREATED);
    }

}
