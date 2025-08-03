package com.seeder.userservice.service;

import com.seeder.userservice.dto.UserDTO;
import com.seeder.userservice.dto.UserFundDashboardDTO;
import com.seeder.userservice.entity.User;
import com.seeder.userservice.entity.UserFundDashboard;
import com.seeder.userservice.exception.UserNotFound;
import com.seeder.userservice.mapper.UserMapper;
import com.seeder.userservice.repository.UserFundDashboardRepository;
import com.seeder.userservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final ModelMapper modelMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserFundDashboardService userFundDashboardService;

    private final UserFundDashboardRepository userFundDashboardRepository;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, ModelMapper modelMapper, BCryptPasswordEncoder bCryptPasswordEncoder, UserFundDashboardService userFundDashboardService, UserFundDashboardRepository userFundDashboardRepository) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.modelMapper = modelMapper;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userFundDashboardService = userFundDashboardService;
        this.userFundDashboardRepository = userFundDashboardRepository;
    }

    @Autowired


    @Override
    public List<UserDTO> findAll() {
        log.info("Inside Service findAllUser():");
        List<User> userEntityList = userRepository.findAll();
        return userEntityList.stream()
                .map(userMapper::entityToDTO)
                .toList();
    }

    @Override
    public UserDTO findByEmail(String email) {
        log.info("Inside Service findByEmail():");
        Optional<User> result = userRepository.findByEmail(email);
        if (result.isPresent()) {
            User userEntity = result.get();
            return userMapper.entityToDTO(userEntity);
        } else {
            throw new UserNotFound("User with email not found: " + email);
        }
    }

    @Override
    public boolean updateAvailableCredit(int userId, double creditAmount) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isPresent()){
            Optional<UserFundDashboard> userFundDashboard = userFundDashboardRepository.findById(user.get().getUserFundDashboardId());
            if(userFundDashboard.isPresent()){
                UserFundDashboard updatedUserFundDashboard =  modelMapper.map(userFundDashboard.get(),UserFundDashboard.class);
                updatedUserFundDashboard.setAvailableCredit(creditAmount);
                userFundDashboardRepository.save(updatedUserFundDashboard);
                return true;
            }
            return false;
        }
        return false;
    }

    @Override
    public UserDTO getUserById(int id) {
        Optional<User> user = userRepository.findById(id);
        UserDTO userDTO = null;
        if(user.isPresent()){
            userDTO = userMapper.entityToDTO(user.get());
        }
        else {
            throw new UserNotFound("Did not find user with id- " + id);
        }
        return userDTO;
    }

    @Override
    public UserDTO save(UserDTO userDto) {
        Optional<User> userOptional = userRepository.findByEmail(userDto.getEmail());
        if (userOptional.isPresent()) {
            log.error("User creation failed. User already exists with email: {}", userDto.getEmail());
            throw new IllegalArgumentException("User already exists");
        } else {
            User theUser = modelMapper.map(userDto, User.class);
            String encryptedPassword = bCryptPasswordEncoder.encode(theUser.getPassword());
            theUser.setPassword(encryptedPassword);

            if (userFundDashboardService != null) {
                UserFundDashboardDTO userFundDashboardDTO = new UserFundDashboardDTO();
                userFundDashboardDTO.setAvailableCredit(880000);
                userFundDashboardDTO.setTermLength(12);
                userFundDashboardDTO.setMaxInterestRate(12);
                UserFundDashboardDTO savedUserFundDashboardDto = userFundDashboardService.save(userFundDashboardDTO);
                theUser.setUserFundDashboardId(savedUserFundDashboardDto.getId());
            } else {
                log.warn("userFundDashboardService is null. UserFundDashboard not created for user with email: {}", userDto.getEmail());
            }

            User user = userRepository.save(theUser);
            return modelMapper.map(user, UserDTO.class);
        }
    }


    @Override
    public UserDTO updatePassword(String email, Map<String, Object> userUpdates) {
        log.info("Inside Service updatePassword():");
        Optional<User> result = userRepository.findByEmail(email);
        if (result.isPresent()) {
            User userEntity = result.get();
            if (userUpdates.containsKey("password")) {
                String newPassword = bCryptPasswordEncoder.encode((String) userUpdates.get("password"));
                userEntity.setPassword(newPassword);
            }
            return userMapper.entityToDTO(userRepository.save(userEntity));
        } else {
            throw new UserNotFound("Did not find User email: " + email);
        }
    }
}