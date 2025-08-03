package com.seeder.paymentservice.service;

import com.seeder.paymentservice.dto.PaymentDTO;
import com.seeder.paymentservice.dto.PaymentResponseDTO;
import com.seeder.paymentservice.entity.Payment;
import com.seeder.paymentservice.exception.ResourceNotFoundException;
import com.seeder.paymentservice.mapper.PaymentMapper;
import com.seeder.paymentservice.repository.PaymentRepository;
import org.jvnet.hk2.annotations.Service;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
@Service
public class PaymentServiceImpl implements PaymentService {

    private PaymentRepository paymentRepository;

    private ModelMapper modelMapper;

    private  PaymentMapper paymentMapper;

    public PaymentServiceImpl(PaymentRepository paymentRepository, ModelMapper modelMapper, PaymentMapper paymentMapper) {
        this.paymentRepository = paymentRepository;
        this.modelMapper = modelMapper;
        this.paymentMapper = paymentMapper;
    }
    @Override
    public List<PaymentResponseDTO> getUserPaymentByUserId(int userId) {
        List<Payment> payments = paymentRepository.findAllByUserId(userId);
        return payments.stream().map(paymentOfUser -> modelMapper.map(paymentOfUser, PaymentResponseDTO.class))
                .toList();

    }

    @Override
    public PaymentResponseDTO createPayment(PaymentDTO paymentDTO) {
        try{
            Payment payment = new Payment();
            payment.setDueDate(paymentDTO.getDueDate());
            payment.setStatus(paymentDTO.getStatus());
            payment.setExpectedAmount(paymentDTO.getExpectedAmount());
            payment.setOustandingAmount(paymentDTO.getOustandingAmount());
            payment.setUserId(paymentDTO.getUserId());

            Payment savedPayment = paymentRepository.save(payment);
            return modelMapper.map(savedPayment,PaymentResponseDTO.class);
        }
        catch (Exception e){
            throw new ResourceNotFoundException("Error creating payment",e);
        }
    }

    @Override
    public PaymentResponseDTO updatePayment(Integer paymentId, Map<String, BigDecimal> updatePayment) {

        Optional<Payment> payments = paymentRepository.findAllById(paymentId);

        if (!payments.isEmpty()) {
            Payment paymentEntity = payments.get();
            if (updatePayment.containsKey("expectedAmount")) {
                BigDecimal newExpectedAmount= (updatePayment.get("expectedAmount") );
                paymentEntity.setExpectedAmount(newExpectedAmount);
            }

            if (updatePayment.containsKey("oustandingAmount")) {
                BigDecimal newOutstandingAmount= (updatePayment.get("oustandingAmount") );
                paymentEntity.setOustandingAmount(newOutstandingAmount);
            }

            return paymentMapper.entityToDTO(paymentRepository.save(paymentEntity));

        } else {
            throw new ResourceNotFoundException("no payment found");
        }
    }
}