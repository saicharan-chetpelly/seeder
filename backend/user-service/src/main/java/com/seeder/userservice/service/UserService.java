package com.seeder.userservice.service;

import com.seeder.userservice.dto.UserDTO;

import java.util.List;
import java.util.Map;

public interface UserService {
    UserDTO save(UserDTO userDTO);

    UserDTO updatePassword(String email, Map<String, Object> updates);

    UserDTO getUserById(int id);

    List<UserDTO> findAll();

    UserDTO findByEmail(String email);

    boolean updateAvailableCredit(int userId, double creditAmount);
}
