package com.seeder.cashkickservice.repository;

import com.seeder.cashkickservice.entity.CashkickContract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CashkickContractRepository extends JpaRepository<CashkickContract,Integer> {
    List<CashkickContract> findAllByCashkickId(int cashkickId);
}
