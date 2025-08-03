package com.seeder.userservice.service;
import com.seeder.userservice.dto.UserFundDashboardDTO;
import com.seeder.userservice.entity.UserFundDashboard;
import com.seeder.userservice.exception.UserNotFound;
import com.seeder.userservice.mapper.UserFundDashboardMapper;
import com.seeder.userservice.repository.UserFundDashboardRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
public class UserFundDashboardServiceImpl implements UserFundDashboardService{

    private final UserFundDashboardRepository userFundDashboardRepository;

    private final UserFundDashboardMapper userFundDashboardMapper;

    @Autowired
    public UserFundDashboardServiceImpl(UserFundDashboardRepository userFundDashboardRepository, UserFundDashboardMapper userFundDashboardMapper, ModelMapper modelMapper) {
        this.userFundDashboardRepository = userFundDashboardRepository;
        this.userFundDashboardMapper = userFundDashboardMapper;
    }

    @Override
    public UserFundDashboardDTO getUserById(int id) {
        Optional<UserFundDashboard> user = userFundDashboardRepository.findById(id);
        UserFundDashboardDTO userDTO = null;
        if(user.isPresent()){
            userDTO = userFundDashboardMapper.entityToDTO(user.get());
        }
        else {
            throw new UserNotFound("Did not find user with id- " + id);
        }
        return userDTO;
    }

    @Override
    public UserFundDashboardDTO save(UserFundDashboardDTO userFundDashboardDTO) {
        log.info("Inside Service saveUser():");
        return userFundDashboardMapper.entityToDTO(userFundDashboardRepository.save(userFundDashboardMapper.dtoToEntity(userFundDashboardDTO)));
    }
}
