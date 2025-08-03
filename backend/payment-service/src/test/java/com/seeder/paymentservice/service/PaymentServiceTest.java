package com.seeder.paymentservice.service;

import com.seeder.paymentservice.dto.PaymentDTO;
import com.seeder.paymentservice.dto.PaymentResponseDTO;
import com.seeder.paymentservice.entity.Payment;

import com.seeder.paymentservice.exception.ResourceNotFoundException;
import com.seeder.paymentservice.mapper.PaymentMapper;
import com.seeder.paymentservice.repository.PaymentRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.*;

import static com.seeder.paymentservice.enums.PaymentStatus.Upcoming;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

class PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;
    @Mock
    private ModelMapper modelMapper;
    @Mock
    private PaymentMapper paymentMapper;
    @InjectMocks
    private PaymentServiceImpl paymentService;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }
    @Test
    void testGetAllPaymentsOfUser() {
        List<Payment> paymentList = new ArrayList<>();
        paymentList.add(new Payment());
        paymentList.add(new Payment());
        when(paymentRepository.findAllByUserId(1)).thenReturn(paymentList);
        when(modelMapper.map(any(Payment.class), eq(PaymentDTO.class)))
                .thenReturn(new PaymentDTO());
        List<PaymentResponseDTO> results = paymentService.getUserPaymentByUserId(1);
        assertNotNull(results);
        assertEquals(2, results.size());
        verify(paymentRepository, times(1)).findAllByUserId(1);
    }


    @Test
    void testCreateNewPayment(){
        Payment payment = new Payment();
        payment.setStatus(Upcoming);
        PaymentResponseDTO paymentResponseDTO = new PaymentResponseDTO();
        paymentResponseDTO.setStatus(Upcoming);
        paymentResponseDTO.setId(1);

        when(paymentRepository.save(any())).thenReturn(payment);
        when(modelMapper.map(payment, PaymentResponseDTO.class)).thenReturn(paymentResponseDTO);
        PaymentResponseDTO paymentResponseDTO1 = paymentService.createPayment(new PaymentDTO());
        assertEquals(paymentResponseDTO1.getStatus(),payment.getStatus());
    }
    @Test
    void testCreateNewPayment_Fails(){
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            when(paymentRepository.save(any())).thenThrow(new ResourceNotFoundException("Error creating payment"));
            paymentService.createPayment(new PaymentDTO());
        });

        assertEquals("Error creating payment", exception.getMessage());
    }

    @Test
    void testUpdatePayment_UserExists() {
        Integer id = 1;
        BigDecimal expectedAmount = BigDecimal.valueOf(120000.00);
        BigDecimal oustandingAmount = BigDecimal.valueOf(1200000.00);

        Map<String, BigDecimal> paymentUpdate = new HashMap<>();
        paymentUpdate.put("expectedAmount", expectedAmount);
        paymentUpdate.put("oustandingAmount", oustandingAmount);


        Payment existingPaymentEntity = new Payment(1, Timestamp.valueOf("2023-12-17 03:14:07.499999"),BigDecimal.valueOf(12000.00),Upcoming,BigDecimal.valueOf(120000.00),1);
        Payment updatedPaymentEntity = new Payment(1, Timestamp.valueOf("2023-12-17 03:14:07.499999"),BigDecimal.valueOf(13000.00),Upcoming,BigDecimal.valueOf(130000.00),1);
        PaymentResponseDTO updatedPaymentDTO = new PaymentResponseDTO(1, 1,Timestamp.valueOf("2023-12-17 03:14:07.499999"),Upcoming,BigDecimal.valueOf(13000.00),BigDecimal.valueOf(130000.00));
        when(paymentRepository.findAllById(id)).thenReturn(Optional.of(existingPaymentEntity));

        when(paymentRepository.save(any(Payment.class))).thenReturn(updatedPaymentEntity);
        when(paymentMapper.entityToDTO(updatedPaymentEntity)).thenReturn(updatedPaymentDTO);
        PaymentResponseDTO result = paymentService.updatePayment(id, paymentUpdate);

        verify(paymentRepository).findAllById(id);
        verify(paymentRepository).save(existingPaymentEntity);

        assertEquals(updatedPaymentDTO, result);
    }

    @Test
    void testUpdatePayment_PaymentNotFound() {
        int id = 1;
        Map<String, BigDecimal> paymentUpdate = new HashMap<>();
        paymentUpdate.put("expectedAmount", BigDecimal.valueOf(120000.00));
        when(paymentRepository.findAllById(id)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> paymentService.updatePayment(id, paymentUpdate));
        verify(paymentRepository).findAllById(id);
        verify(paymentRepository, never()).save(any(Payment.class));
    }
}
