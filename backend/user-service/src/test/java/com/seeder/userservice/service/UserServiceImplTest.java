package com.seeder.userservice.service;

import com.seeder.userservice.dto.UserDTO;
import com.seeder.userservice.dto.UserFundDashboardDTO;
import com.seeder.userservice.entity.User;
import com.seeder.userservice.entity.UserFundDashboard;
import com.seeder.userservice.exception.UserNotFound;
import com.seeder.userservice.mapper.UserMapper;
import com.seeder.userservice.repository.UserFundDashboardRepository;
import com.seeder.userservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserFundDashboardRepository userFundDashboardRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Mock
    private UserFundDashboardService userFundDashboardService;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testFindAll_ReturnsListOfUserDTOs() {
        List<User> userEntityList = Arrays.asList(
                new User(1, "prasad","prasad@gmail.com","Test@123",0),
                new User(2, "prasad","prasad@gmail.com","Test@123",0)
        );

        List<UserDTO> userDTOList = Arrays.asList(
                new UserDTO(1,"prasad","prasad@gmail.com","Test@123",0),
                new UserDTO(2,"prasad","prasad@gmail.com","Test@123",0)
        );

        when(userRepository.findAll()).thenReturn(userEntityList);
        when(userMapper.entityToDTO(any(User.class)))
                .thenReturn(userDTOList.get(0), userDTOList.get(1));

        List<UserDTO> result = userService.findAll();

        assertEquals(userDTOList.size(), result.size());

        for (int i = 0; i < userDTOList.size(); i++) {
            UserDTO expectedDTO = userDTOList.get(i);
            UserDTO actualDTO = result.get(i);

            assertEquals(expectedDTO.getName(), actualDTO.getName());
        }
    }

    @Test
    void testGetUserById_UserFound() {
        int userId = 1;
        User mockUser = new User();
        when(userRepository.findById(userId)).thenReturn(Optional.of(mockUser));
        UserDTO mockUserDTO = new UserDTO();
        when(userMapper.entityToDTO(mockUser)).thenReturn(mockUserDTO);

        UserDTO result = userService.getUserById(userId);

        assertNotNull(result);
        assertEquals(mockUserDTO, result);
    }

    @Test
    void testFindByEmailExistingUser() {

        String email = "test@example.com";
        User userEntity = new User();
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(userEntity));
        when(userMapper.entityToDTO(userEntity)).thenReturn(new UserDTO());

        UserDTO userDTO = userService.findByEmail(email);

        assertNotNull(userDTO);
        verify(userRepository, times(1)).findByEmail(email);
        verify(userMapper, times(1)).entityToDTO(userEntity);
    }


    @Test
    void testFindByEmailNonExistingUser() {

        String email = "nonexistent@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UserNotFound.class, () -> userService.findByEmail(email));
        verify(userRepository, times(1)).findByEmail(email);
    }

    @Test
    void testGetUserById_UserNotFound() {
        int userId = 1;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFound.class, () -> userService.getUserById(userId));
    }

    @Test
    void testSave_NewUser() {
        UserDTO newUserDTO = new UserDTO(1, "New User", "newuser@example.com", "password123", 1);
        User newUserEntity = new User(1, "New User", "newuser@example.com", "password123", 1);

        when(userRepository.findByEmail(newUserDTO.getEmail())).thenReturn(Optional.empty());
        when(modelMapper.map(newUserDTO, User.class)).thenReturn(newUserEntity);
        when(bCryptPasswordEncoder.encode(anyString())).thenReturn("encryptedPassword");

        UserFundDashboardDTO userFundDashboardDTO = new UserFundDashboardDTO();
        userFundDashboardDTO.setId(1);
        when(userFundDashboardService.save(any(UserFundDashboardDTO.class))).thenReturn(userFundDashboardDTO);

        when(userRepository.save(newUserEntity)).thenReturn(newUserEntity);
        when(modelMapper.map(newUserEntity, UserDTO.class)).thenReturn(newUserDTO);

        UserDTO savedUserDTO = userService.save(newUserDTO);

        verify(userRepository).findByEmail(newUserDTO.getEmail());
        verify(modelMapper).map(newUserDTO, User.class);
        verify(bCryptPasswordEncoder).encode(anyString());
        verify(userRepository).save(newUserEntity);
        verify(modelMapper).map(newUserEntity, UserDTO.class);

        verify(userFundDashboardService).save(any(UserFundDashboardDTO.class));

        assertEquals(newUserDTO, savedUserDTO);
    }

    @Test
    void testSave_UserAlreadyExists() {
        UserDTO existingUserDTO = new UserDTO(1, "Existing User", "existinguser@example.com", "password123", 1);

        when(userRepository.findByEmail(existingUserDTO.getEmail())).thenReturn(Optional.of(new User()));

        assertThrows(IllegalArgumentException.class, () -> userService.save(existingUserDTO));

        verify(userRepository, times(1)).findByEmail(existingUserDTO.getEmail());

        verify(modelMapper, never()).map(any(UserDTO.class), eq(User.class));
        verify(bCryptPasswordEncoder, never()).encode(anyString());
        verify(userRepository, never()).save(any(User.class));
        verify(modelMapper, never()).map(any(User.class), eq(UserDTO.class));
    }

    @Test
    void testUpdatePassword_UserExists() {
        String userEmail = "user@example.com";
        String newPassword = "newPassword";
        Map<String, Object> userUpdates = new HashMap<>();
        userUpdates.put("password", newPassword);

        User existingUserEntity = new User(1, "User", userEmail, "oldPassword", 1);
        User updatedUserEntity = new User(1, "User", userEmail, "encodedNewPassword", 1);
        UserDTO updatedUserDTO = new UserDTO(1, "User", userEmail, "encodedNewPassword", 1);

        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(existingUserEntity));
        when(bCryptPasswordEncoder.encode(newPassword)).thenReturn("encodedNewPassword");
        when(userRepository.save(any(User.class))).thenReturn(updatedUserEntity);
        when(userMapper.entityToDTO(updatedUserEntity)).thenReturn(updatedUserDTO);

        UserDTO result = userService.updatePassword(userEmail, userUpdates);

        verify(userRepository).findByEmail(userEmail);
        verify(bCryptPasswordEncoder).encode(newPassword);
        verify(userRepository).save(existingUserEntity);
        verify(userMapper).entityToDTO(updatedUserEntity);

        assertEquals(updatedUserDTO, result);
    }
    @Test
    void testUpdatePassword_UserNotFound() {
        String email = "newuser@gmail.com";
        Map<String, Object> userUpdates = new HashMap<>();
        userUpdates.put("password", "newPassword123");

        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UserNotFound.class, () -> userService.updatePassword(email, userUpdates));
        verify(userRepository).findByEmail(email);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testUpdateAvailableCreditUserNotFound() {
        int userId = 1;
        double creditAmount = 1000.0;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        boolean result = userService.updateAvailableCredit(userId, creditAmount);

        assertFalse(result);
        verify(userRepository, times(1)).findById(userId);
        verifyNoInteractions(userFundDashboardRepository);
    }

    @Test
    void testUpdateAvailableCreditUserFundDashboardNotFound() {
        int userId = 1;
        double creditAmount = 1000.0;

        User user = new User();
        user.setId(userId);
        user.setUserFundDashboardId(1);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userFundDashboardRepository.findById(user.getUserFundDashboardId())).thenReturn(Optional.empty());

        boolean result = userService.updateAvailableCredit(userId, creditAmount);

        assertFalse(result);

        verify(userRepository, times(1)).findById(userId);
        verify(userFundDashboardRepository, times(1)).findById(user.getUserFundDashboardId());
        verifyNoInteractions(modelMapper);
    }

    @Test
    void testUpdateAvailableCreditSuccess() {
        int userId = 1;
        double creditAmount = 1000.0;

        User user = new User();
        user.setId(userId);
        user.setUserFundDashboardId(1);

        UserFundDashboard userFundDashboard = new UserFundDashboard();
        userFundDashboard.setId(1);
        userFundDashboard.setAvailableCredit(500.0);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(userFundDashboardRepository.findById(user.getUserFundDashboardId())).thenReturn(Optional.of(userFundDashboard));
        when(modelMapper.map(any(), eq(UserFundDashboard.class))).thenReturn(userFundDashboard);
        boolean result = userService.updateAvailableCredit(userId, creditAmount);
        assertTrue(result);
        verify(userRepository, times(1)).findById(userId);
        verify(userFundDashboardRepository, times(1)).findById(user.getUserFundDashboardId());
        verify(modelMapper, times(1)).map(any(), eq(UserFundDashboard.class));
        verify(userFundDashboardRepository, times(1)).save(any(UserFundDashboard.class));

        assertEquals(creditAmount, userFundDashboard.getAvailableCredit());
    }
}
