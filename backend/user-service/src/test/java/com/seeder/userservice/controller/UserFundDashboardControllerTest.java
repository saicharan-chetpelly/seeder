package com.seeder.userservice.controller;

import com.seeder.userservice.dto.UserFundDashboardDTO;
import com.seeder.userservice.service.UserFundDashboardService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

class UserFundDashboardControllerTest {

    @Mock
    private UserFundDashboardService userFundDashboardService;

    @InjectMocks
    private UserFundDashboardController userFundDashboardController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void save_shouldReturnCreatedResponse() {
        UserFundDashboardDTO mockDTO = new UserFundDashboardDTO();
        when(userFundDashboardService.save(any(UserFundDashboardDTO.class))).thenReturn(mockDTO);

        ResponseEntity<UserFundDashboardDTO> response = userFundDashboardController.save(new UserFundDashboardDTO());

        assertNotNull(response);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(mockDTO, response.getBody());
        verify(userFundDashboardService, times(1)).save(any(UserFundDashboardDTO.class));
    }

    @Test
    void getUserById_shouldReturnUserFundDashboardDTO() {
        int userId = 1;
        UserFundDashboardDTO mockDTO = new UserFundDashboardDTO();
        when(userFundDashboardService.getUserById(userId)).thenReturn(mockDTO);

        ResponseEntity<UserFundDashboardDTO> response = userFundDashboardController.getUserById(userId);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockDTO, response.getBody());
        verify(userFundDashboardService, times(1)).getUserById(userId);
    }

    @Test
    void getUserById_shouldReturnNotFoundResponse() {
        int userId = 1;
        when(userFundDashboardService.getUserById(userId)).thenReturn(null);

        ResponseEntity<UserFundDashboardDTO> response = userFundDashboardController.getUserById(userId);

        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(userFundDashboardService, times(1)).getUserById(userId);
    }
}
