package com.seeder.contractservice.service;

import com.seeder.contractservice.dto.ContractsDTO;
import com.seeder.contractservice.entity.Contracts;
import com.seeder.contractservice.exception.ResourceNotFoundException;
import com.seeder.contractservice.repository.ContractRepository;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Component
public class ContractServiceImpl implements ContractService{
    private ContractRepository contractRepository;
    private ModelMapper modelMapper;
    public ContractServiceImpl(ContractRepository contractRepository, ModelMapper modelMapper) {
        this.contractRepository = contractRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<ContractsDTO> getAllContract() {
        try {
            List<Contracts> contractsList =  contractRepository.findAll();
            return contractsList.stream().map(contract -> modelMapper.map(contract, ContractsDTO.class))
                    .toList();
        }
        catch (Exception e) {
        throw new ResourceNotFoundException("An error occurred while fetching all contract ", e);
        }
    }

    @Override
    public ContractsDTO getUserContractById(int id) {
        Contracts contracts = contractRepository.findById(id);
        return  modelMapper.map(contracts, ContractsDTO.class);

    }
}


