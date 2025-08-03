package com.seeder.userservice.controller;

import com.seeder.userservice.dto.UserFundDashboardDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.seeder.userservice.service.UserFundDashboardService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/userFunds")
public class UserFundDashboardController {

    private final UserFundDashboardService userFundDashboardService;

    @Autowired
    public UserFundDashboardController(UserFundDashboardService userFundDashboardService) {
        this.userFundDashboardService = userFundDashboardService;
    }

    @PostMapping
    public ResponseEntity<UserFundDashboardDTO> save(@RequestBody UserFundDashboardDTO userFundDashboardDTO) {
        log.info("Request received at createUser.");
        return ResponseEntity.status(HttpStatus.CREATED).body(userFundDashboardService.save(userFundDashboardDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserFundDashboardDTO> getUserById(@PathVariable("id") int id){
        UserFundDashboardDTO userFundDashboardDTO = userFundDashboardService.getUserById(id);
        if (userFundDashboardDTO != null) {
            return ResponseEntity.ok(userFundDashboardDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
