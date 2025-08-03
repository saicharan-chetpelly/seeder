package com.seeder.contractservice.repository;

import com.seeder.contractservice.entity.Contracts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractRepository extends JpaRepository<Contracts, Integer> {

    Contracts findById(int id);
}
