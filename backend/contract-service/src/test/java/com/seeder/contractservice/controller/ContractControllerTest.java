package com.seeder.contractservice.controller;

import com.seeder.contractservice.dto.ContractsDTO;
import com.seeder.contractservice.enums.Type;
import com.seeder.contractservice.service.ContractService;
import jakarta.ws.rs.core.MediaType;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ContextConfiguration(classes = {ContractController.class})


@RunWith(SpringRunner.class)
@WebMvcTest(ContractController.class)
class ContractControllerTest {
    @Autowired
    private ContractController contractController;
    @MockBean
    private ContractService contractService;
    @Autowired
    private MockMvc mvc;

    /**
     * Method under test: {@link ContractController#getAllContract()}
     */
    @Test
    void testGetAllContract() throws Exception {
        ContractsDTO contractsDTO = new ContractsDTO();
        contractsDTO.setId(123);
        contractsDTO.setName("?");
        contractsDTO.setPerPayment(1);
        contractsDTO.setTotalAvailable(1);
        contractsDTO.setTotalFinanced(1L);
        contractsDTO.setType(Type.Monthly);
        ArrayList<ContractsDTO> contractsDTOList = new ArrayList<>();
        contractsDTOList.add(contractsDTO);
        when(contractService.getAllContract()).thenReturn(contractsDTOList);
        mvc.perform(get("/api/contract").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());
    }

    @Test
    void testNoContractAvailable() throws Exception {
        ArrayList<ContractsDTO> contractsDTOList = new ArrayList<>();
        when(contractService.getAllContract()).thenReturn(contractsDTOList);
        mvc.perform(get("/api/contract").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());
    }

    @Test
    void testGetContractByUserId() {
        int id = 1;
        ContractsDTO contractsDTO = new ContractsDTO();
        contractsDTO.setName("contract1");
        contractsDTO.setId(id);
        when(contractService.getUserContractById(id)).thenReturn(contractsDTO);
        ResponseEntity  response = contractController.getUserContractsByUserId(id);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(contractsDTO, response.getBody());
    }
}
