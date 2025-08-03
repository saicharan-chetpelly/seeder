package com.seeder.cashkickservice.repository;

import com.seeder.cashkickservice.entity.Cashkick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CashkickRepository extends JpaRepository<Cashkick,Integer> {

    List<Cashkick> findAllByUserId(int userId);
}
