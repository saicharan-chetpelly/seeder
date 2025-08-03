package com.seeder.cashkickservice.service;

import com.seeder.cashkickservice.dto.CashkickRequestDto;
import com.seeder.cashkickservice.dto.CashkickResponseDto;
import com.seeder.cashkickservice.entity.Cashkick;
import com.seeder.cashkickservice.enums.CashkickStatus;
import com.seeder.cashkickservice.exception.NotFoundException;
import com.seeder.cashkickservice.repository.CashkickRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Slf4j
@Service
public class CashkickServiceImpl implements CashkickService{

    private CashkickRepository cashkickRepository;

    private ModelMapper modelMapper;
    @Autowired
    public CashkickServiceImpl(CashkickRepository cashkickRepository, ModelMapper modelMapper) {
        this.cashkickRepository = cashkickRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<CashkickResponseDto> getAllCashkicksByUserId(int userId) {
        log.info("Fetching cashkicks for user with ID: {}", userId);
        try {
            List<Cashkick> cashkickList = cashkickRepository.findAllByUserId(userId);
            log.info("Cashkicks for user with ID {}: {}", userId, cashkickList);
             return cashkickList.stream()
                    .map(cashkick -> modelMapper.map(cashkick, CashkickResponseDto.class))
                    .toList();

        } catch (Exception e) {
            log.error("An error occurred while fetching all cashkicks of user with ID {}: {}", userId, e.getMessage(), e);
            throw new NotFoundException("An error occurred while fetching all cashkicks of user", e);
        }
    }

    @Override
    public CashkickResponseDto createCashkick(CashkickRequestDto cashkickRequestDto) {
        try{
            Cashkick cashkick = new Cashkick();
            cashkick.setName(cashkickRequestDto.getName());
            cashkick.setStatus(CashkickStatus.Pending);
            cashkick.setTotalFinanced(cashkickRequestDto.getTotalFinanced());
            cashkick.setTotalReceived(cashkickRequestDto.getTotalReceived());
            cashkick.setUserId(cashkickRequestDto.getUserId());
            cashkick.setMaturity(new Timestamp(System.currentTimeMillis()));
            Cashkick savedCashkick = cashkickRepository.save(cashkick);
            return modelMapper.map(savedCashkick,CashkickResponseDto.class);
        }
        catch (Exception e){
            throw new NotFoundException("Error creating cashkick",e);
        }
    }


}
