package com.seeder.paymentservice.service;

import com.seeder.paymentservice.dto.PaymentDTO;
import com.seeder.paymentservice.dto.PaymentResponseDTO;
import org.jvnet.hk2.annotations.Service;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;


@Component
@Service
public interface PaymentService {
    List<PaymentResponseDTO> getUserPaymentByUserId(int userId);

    PaymentResponseDTO createPayment(PaymentDTO paymentDTO);

    PaymentResponseDTO updatePayment(Integer paymentId, Map<String, BigDecimal> updates);
}