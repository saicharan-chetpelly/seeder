package com.seeder.contractservice.service;

import com.seeder.contractservice.dto.ContractsDTO;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Component
public interface ContractService {
    List<ContractsDTO> getAllContract();
    ContractsDTO getUserContractById(int id);
}
