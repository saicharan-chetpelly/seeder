package com.seeder.userservice.mapper;

import com.seeder.userservice.dto.UserDTO;
import com.seeder.userservice.entity.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

        @Autowired
        private static ModelMapper modelMapper;
        static {
             modelMapper = new ModelMapper();
        }
        public User dtoToEntity(UserDTO userDTO){
            modelMapper.getConfiguration()
                    .setMatchingStrategy(MatchingStrategies.LOOSE);
            return modelMapper.map(userDTO, User.class);
        }
        public UserDTO entityToDTO(User user){
            modelMapper.getConfiguration()
                    .setMatchingStrategy(MatchingStrategies.LOOSE);
            return modelMapper.map(user, UserDTO.class);
        }
}