package com.seeder.contractservice.controller;

import com.seeder.contractservice.dto.ContractsDTO;
import com.seeder.contractservice.service.ContractService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/contract")
public class ContractController {
    private ContractService contractService;
    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @GetMapping
    public ResponseEntity<List<ContractsDTO>> getAllContract() {
        List<ContractsDTO> contractsList = contractService.getAllContract();
        if (contractsList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(contractsList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContractsDTO> getUserContractsByUserId(@PathVariable("id") int id) {
        ContractsDTO userContracts = contractService.getUserContractById(id);
        return ResponseEntity.ok(userContracts);
    }
}
