package com.seeder.contractservice.service;


import com.seeder.contractservice.dto.ContractsDTO;
import com.seeder.contractservice.entity.Contracts;
import com.seeder.contractservice.repository.ContractRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.ArrayList;
import java.util.List;
import static com.seeder.contractservice.enums.Status.Available;
import static com.seeder.contractservice.enums.Type.Monthly;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@SpringBootTest
class ContractServiceImplementationTest {
    @Mock
    ContractRepository contractsRepository;
    @Autowired
    ContractServiceImpl contractServiceImplementation;

    @Mock
    private ModelMapper modelMapper;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    /**
     * Method under test: {@link ContractServiceImpl#getAllContract()}
     */
    @Test
    void testGetAllContract_Positive_Test_Case() {
        //Given
        List<Contracts> contrctList = new ArrayList<Contracts>();
        Contracts contract1 = new Contracts();
        contract1.setId(1);
        contract1.setContractName("Contract1");
        contract1.setStatus(Available);
        contract1.setType(Monthly);
        contract1.setPerPayment(12L);
        contract1.setTotalFinancied(0);
        contract1.setTotalAvailable(2000L);
        contrctList.add(contract1);
        //when
        when(contractsRepository.findAll()).thenReturn(contrctList);
        //test
        Assertions.assertEquals(contract1.getContractName(), contractServiceImplementation.getAllContract().get(0).getName());
    }

    @Test
    void testGetAllContractsOfUser() {
        Contracts contracts = new Contracts();
        when(contractsRepository.findById(1)).thenReturn(contracts);
        when(modelMapper.map(any(Contracts.class), eq(ContractsDTO.class)))
                .thenReturn(new ContractsDTO());
        ContractsDTO results = contractServiceImplementation.getUserContractById(1);
        assertNotNull(results);
    }
}



