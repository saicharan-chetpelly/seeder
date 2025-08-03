package com.seeder.paymentservice.controller;

import com.seeder.paymentservice.dto.PaymentDTO;
import com.seeder.paymentservice.dto.PaymentResponseDTO;
import com.seeder.paymentservice.service.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PaymentResponseDTO>> getUserPaymentByUserId(@PathVariable("userId") int userId) {
        List<PaymentResponseDTO> userPayments = paymentService.getUserPaymentByUserId(userId);
        if (userPayments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userPayments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<PaymentResponseDTO> createPayment(@RequestBody PaymentDTO paymentDTO){
        PaymentResponseDTO paymentResponseDTO = paymentService.createPayment(paymentDTO);
        return new ResponseEntity<>(paymentResponseDTO, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<PaymentResponseDTO> updatePayment(@PathVariable("id") int id, @RequestBody Map<String, BigDecimal> updates) {
        return ResponseEntity.ok(paymentService.updatePayment(id, updates));
    }

}
