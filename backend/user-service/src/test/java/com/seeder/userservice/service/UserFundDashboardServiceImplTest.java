package com.seeder.userservice.service;

import com.seeder.userservice.dto.UserFundDashboardDTO;
import com.seeder.userservice.entity.UserFundDashboard;
import com.seeder.userservice.exception.UserNotFound;
import com.seeder.userservice.mapper.UserFundDashboardMapper;
import com.seeder.userservice.repository.UserFundDashboardRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserFundDashboardServiceImplTest {

    @Mock
    private UserFundDashboardRepository userFundDashboardRepository;

    @Mock
    private UserFundDashboardMapper userFundDashboardMapper;


    @InjectMocks
    private UserFundDashboardServiceImpl userFundDashboardService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getUserById_existingUser_shouldReturnUserFundDashboardDTO() {
        int userId = 1;
        UserFundDashboard userFundDashboardEntity = new UserFundDashboard();
        UserFundDashboardDTO expectedUserDTO = new UserFundDashboardDTO();

        when(userFundDashboardRepository.findById(userId)).thenReturn(Optional.of(userFundDashboardEntity));
        when(userFundDashboardMapper.entityToDTO(userFundDashboardEntity)).thenReturn(expectedUserDTO);

        UserFundDashboardDTO resultUserDTO = userFundDashboardService.getUserById(userId);

        assertNotNull(resultUserDTO);
        assertEquals(expectedUserDTO, resultUserDTO);
        verify(userFundDashboardRepository, times(1)).findById(userId);
        verify(userFundDashboardMapper, times(1)).entityToDTO(userFundDashboardEntity);
    }

    @Test
    void getUserById_nonExistingUser_shouldThrowUserNotFoundException() {
        int userId = 1;

        when(userFundDashboardRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFound.class, () -> userFundDashboardService.getUserById(userId));

        verify(userFundDashboardRepository, times(1)).findById(userId);
    }

    @Test
    void saveUser_shouldReturnUserFundDashboardDTO() {
        UserFundDashboardDTO inputUserDTO = new UserFundDashboardDTO();
        UserFundDashboard userFundDashboardEntity = new UserFundDashboard();
        when(userFundDashboardMapper.dtoToEntity(inputUserDTO)).thenReturn(userFundDashboardEntity);
        when(userFundDashboardRepository.save(userFundDashboardEntity)).thenReturn(userFundDashboardEntity);
        when(userFundDashboardMapper.entityToDTO(userFundDashboardEntity)).thenReturn(inputUserDTO);

        UserFundDashboardDTO resultUserDTO = userFundDashboardService.save(inputUserDTO);

        assertNotNull(resultUserDTO);
        assertEquals(inputUserDTO, resultUserDTO);
        verify(userFundDashboardMapper, times(1)).dtoToEntity(inputUserDTO);
        verify(userFundDashboardRepository, times(1)).save(userFundDashboardEntity);
        verify(userFundDashboardMapper, times(1)).entityToDTO(userFundDashboardEntity);
    }
}
