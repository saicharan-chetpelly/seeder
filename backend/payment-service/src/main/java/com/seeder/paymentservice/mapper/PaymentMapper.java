package com.seeder.paymentservice.mapper;

import com.seeder.paymentservice.dto.PaymentDTO;
import com.seeder.paymentservice.dto.PaymentResponseDTO;
import com.seeder.paymentservice.entity.Payment;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    @Autowired
    private static ModelMapper modelMapper;
    static {
        modelMapper = new ModelMapper();
    }
    public Payment dtoToEntity(PaymentDTO paymentDTO){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(paymentDTO, Payment.class);
    }
    public PaymentResponseDTO entityToDTO(Payment payment){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(payment, PaymentResponseDTO.class);
    }
}
