package com.seeder.userservice.controller;

import com.seeder.userservice.dto.Auth;

import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import com.seeder.userservice.dto.UserDTO;
import com.seeder.userservice.service.JwtService;
import com.seeder.userservice.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
class UserControllerTest {

    private UserController userController;
    private UserService userService;
    @Mock
    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        userService = mock(UserService.class);
        userController = new UserController(userService, jwtService);
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAll_ReturnsListOfUserDTOs() {
        List<UserDTO> userDTOList = Arrays.asList(
                new UserDTO(1, "prasad", "prasad@gmail.com", "Test@123", 0),
                new UserDTO(2,"sai", "sai@gmail.com", "Test@123", 0)
        );

        when(userService.findAll()).thenReturn(userDTOList);

        ResponseEntity<List<UserDTO>> response = userController.getAll();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userDTOList, response.getBody());
    }

    @Test
    void testGetByEmail_WithValidEmail_ReturnsUserDTO() {
        String userEmail = "prasad@gmail.com";
        UserDTO userDTO = new UserDTO(1, "prasad", userEmail, "Test@123", 0);

        when(userService.findByEmail(userEmail)).thenReturn(userDTO);

        ResponseEntity<UserDTO> response = userController.getByEmail(userEmail);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(userDTO, response.getBody());
    }

    @Test
    void getUserById_userFound() {
        int userId = 1;
        UserDTO mockUserDTO = new UserDTO();
        when(userService.getUserById(userId)).thenReturn(mockUserDTO);

        ResponseEntity<UserDTO> response = userController.getUserById(userId);

        verify(userService, times(1)).getUserById(userId);
    }

    @Test
    void getUserById_userNotFound() {
        int userId = 1;
        when(userService.getUserById(userId)).thenReturn(null);

        ResponseEntity<UserDTO> response = userController.getUserById(userId);

        verify(userService, times(1)).getUserById(userId);
    }

    @Test
    void createUser_validUser_shouldReturnCreated() {
        UserDTO mockUserDTO = new UserDTO();
        when(userService.save(any(UserDTO.class))).thenReturn(mockUserDTO);

        ResponseEntity<UserDTO> response = userController.create(mockUserDTO);

        verify(userService, times(1)).save(any(UserDTO.class));
    }

    @Test
    void updatePassword_Success() {
        String email = "test@example.com";
        Map<String, Object> updates = new HashMap<>();
        updates.put("password", "newPassword");

        UserDTO mockUpdatedUserDTO = new UserDTO();
        when(userService.updatePassword(eq(email), anyMap())).thenReturn(mockUpdatedUserDTO);

        ResponseEntity<UserDTO> response = userController.updatePassword(email, updates);

        verify(userService, times(1)).updatePassword(eq(email), anyMap());
    }
    @Test
    void getToken_InvalidCredentials() throws Exception {
        Auth invalidAuth = new Auth(null, "password");

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(userController).build();

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/login")
                        .content("{\"password\": \"password\"}")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound())
                .andExpect(MockMvcResultMatchers.content().string("Either of email or password is null"));
    }

    @Test
    void testGetTokenInvalidInput() {
        Auth auth = new Auth(null, "password");

        ResponseEntity<String> response = userController.getToken(auth);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Either of email or password is null", response.getBody());

        verifyNoInteractions(jwtService);
    }

    @Test
    void testUpdateAvailableCreditSuccess() {
        int userId = 1;
        double availableCredit = 1000.0;

        when(userService.updateAvailableCredit(userId, availableCredit)).thenReturn(true);

        ResponseEntity<String> response = userController.updateAvailableCredit(userId, availableCredit);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Available credit updated successfully", response.getBody());

        verify(userService, times(1)).updateAvailableCredit(userId, availableCredit);
    }

    @Test
    void testUpdateAvailableCreditFailure() {
        int userId = 1;
        double availableCredit = 1000.0;

        when(userService.updateAvailableCredit(userId, availableCredit)).thenReturn(false);

        ResponseEntity<String> response = userController.updateAvailableCredit(userId, availableCredit);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Failed to update available credit", response.getBody());

        verify(userService, times(1)).updateAvailableCredit(userId, availableCredit);
    }
    @Test
    void testValidateToken() {
        JwtService jwtService = mock(JwtService.class);
        UserController userController = new UserController(mock(UserService.class), jwtService);
        String token = "validToken";
        String response = userController.validateToken(token);
        assertEquals("Token is valid", response);
        verify(jwtService, times(1)).validateToken(token);
    }
    @Test
    void testGetTokenSuccess() {
        JwtService jwtService = mock(JwtService.class);
        UserController userController = new UserController(mock(UserService.class), jwtService);
        Auth auth = new Auth("test@example.com", "password");
        String expectedToken = "mockedToken";
        when(jwtService.generateToken(auth.getEmail(), auth.getPassword())).thenReturn(expectedToken);
        ResponseEntity<String> response = userController.getToken(auth);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedToken, response.getBody());
        verify(jwtService, times(1)).generateToken(auth.getEmail(), auth.getPassword());
    }
    @Test
    void testGetTokenFailure() {
        JwtService jwtService = mock(JwtService.class);
        UserController userController = new UserController(mock(UserService.class), jwtService);
        Auth auth = new Auth("test@example.com", "password");
        when(jwtService.generateToken(auth.getEmail(), auth.getPassword())).thenReturn("Unable to generate token");
        ResponseEntity<String> response = userController.getToken(auth);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Unable to generate token", response.getBody());

        verify(jwtService, times(1)).generateToken(auth.getEmail(), auth.getPassword());
    }
}
