package com.seeder.paymentservice.repository;

import com.seeder.paymentservice.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    List<Payment> findAllByUserId(int userId);

    Optional<Payment> findAllById(int id);
}
