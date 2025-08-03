package com.seeder.cashkickservice.service;

import com.seeder.cashkickservice.dto.CashkickContractRequestDto;
import com.seeder.cashkickservice.dto.CashkickContractResponseDto;
import com.seeder.cashkickservice.entity.CashkickContract;
import com.seeder.cashkickservice.exception.NotFoundException;
import com.seeder.cashkickservice.repository.CashkickContractRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CashkickContractServiceImpl implements CashkickContractService{
    private CashkickContractRepository cashkickContractRepository;
    private ModelMapper modelMapper;

    public CashkickContractServiceImpl(CashkickContractRepository cashkickContractRepository, ModelMapper modelMapper) {
        this.cashkickContractRepository = cashkickContractRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<CashkickContractResponseDto> getAllCashkickContractsByCashkickId(int cashkickId) {
        try{
            List<CashkickContract> cashkickContractList = cashkickContractRepository.findAllByCashkickId(cashkickId);
            return cashkickContractList.stream().map(cashkickContract -> modelMapper.map(cashkickContract, CashkickContractResponseDto.class)).toList();
        }
        catch (Exception e){
            throw new NotFoundException("Error fetching cashkick contracts of user",e);
        }

    }

    @Override
    public CashkickContractResponseDto createCashkickContract(CashkickContractRequestDto cashkickContractRequestDto) {
        try{
            CashkickContract cashkickContract = new CashkickContract();
            cashkickContract.setCashkickId(cashkickContractRequestDto.getCashkickId());
            cashkickContract.setContractId(cashkickContractRequestDto.getContractId());
            CashkickContract savedCashkickContract = cashkickContractRepository.save(cashkickContract);
            return modelMapper.map(savedCashkickContract,CashkickContractResponseDto.class);
        }
        catch (Exception e){
            throw new NotFoundException("Error creating cashkick contract",e);
        }
    }
}
