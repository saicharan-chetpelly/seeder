package com.seeder.userservice.mapper;

import com.seeder.userservice.dto.UserFundDashboardDTO;
import com.seeder.userservice.entity.UserFundDashboard;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserFundDashboardMapper {

    @Autowired
    private static ModelMapper modelMapper;
    static {
        modelMapper = new ModelMapper();
    }
    public UserFundDashboard dtoToEntity(UserFundDashboardDTO userFundDashboardDTO){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(userFundDashboardDTO, UserFundDashboard.class);
    }
    public UserFundDashboardDTO entityToDTO(UserFundDashboard user){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(user, UserFundDashboardDTO.class);
    }
}