package com.seeder.paymentservice.controller;

import com.seeder.paymentservice.dto.PaymentDTO;
import com.seeder.paymentservice.dto.PaymentResponseDTO;
import com.seeder.paymentservice.service.PaymentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.seeder.paymentservice.enums.PaymentStatus.Upcoming;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

 class PaymentControllerTest {

    @Mock
    private PaymentService paymentService;
    @InjectMocks
    private PaymentController paymentController;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testGetPaymentByUserId(){
        int userId = 1;
        List<PaymentResponseDTO> paymentDTOS = new ArrayList<>();
        PaymentResponseDTO paymentDTO = new PaymentResponseDTO();
        paymentDTO.setStatus(Upcoming);
        paymentDTO.setUserId(userId);
        paymentDTOS.add(paymentDTO);
        when(paymentService.getUserPaymentByUserId(userId)).thenReturn(paymentDTOS);
        ResponseEntity<List<PaymentResponseDTO>> response = paymentController.getUserPaymentByUserId(userId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(paymentDTOS, response.getBody());
    }

     @Test
     void testGetAllPaymentsId_NotExists(){
         int id = 1;
         List<PaymentResponseDTO> paymentDTOList = new ArrayList<>();
         when(paymentService.getUserPaymentByUserId(id)).thenReturn(paymentDTOList);
         ResponseEntity<List<PaymentResponseDTO>> response = paymentController.getUserPaymentByUserId(id);
         assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
     }

    @Test
    void testCreateNewPayment(){
        PaymentDTO paymentDTO = new PaymentDTO();
        PaymentResponseDTO paymentResponseDTO = new PaymentResponseDTO();
        paymentDTO.setStatus(Upcoming);
        paymentDTO.setUserId(1);
        paymentResponseDTO.setStatus(paymentDTO.getStatus());
        paymentResponseDTO.setUserId(paymentDTO.getUserId());
        when(paymentService.createPayment(paymentDTO)).thenReturn(paymentResponseDTO);
        ResponseEntity<PaymentResponseDTO> responseDtoResponseEntity = paymentController.createPayment(paymentDTO);
        assertEquals(HttpStatus.CREATED, responseDtoResponseEntity.getStatusCode());
        assertEquals(paymentResponseDTO, responseDtoResponseEntity.getBody());
    }

    @Test
    void updatePassword_Success() {
        Integer id = 1;
        Map<String, BigDecimal> updates = new HashMap<>();
        updates.put("expectedAmount", BigDecimal.valueOf(120000.00));
        updates.put("oustandingAmount", BigDecimal.valueOf(12000.00));

        PaymentResponseDTO paymentDTO = new PaymentResponseDTO();
        when(paymentService.updatePayment(eq(id), anyMap())).thenReturn(paymentDTO);

        ResponseEntity<PaymentResponseDTO> response = paymentController.updatePayment(id, updates);

        verify(paymentService, times(1)).updatePayment(eq(id), anyMap());
    }
}



