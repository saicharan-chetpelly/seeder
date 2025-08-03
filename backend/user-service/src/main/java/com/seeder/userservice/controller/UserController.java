package com.seeder.userservice.controller;

import com.seeder.userservice.dto.Auth;
import com.seeder.userservice.dto.UserDTO;
import com.seeder.userservice.service.JwtService;
import com.seeder.userservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;
@RestController
@Slf4j
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAll() {
        log.info("Request received at getAllUsers.");
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/email")
    public ResponseEntity<UserDTO> getByEmail(@RequestParam("email") String email) {
        log.info("Request received at getByEmail.");
        return ResponseEntity.ok(userService.findByEmail(email));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") int id){
        UserDTO userDTO = userService.getUserById(id);
        if (userDTO != null) {
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<UserDTO> create(@RequestBody UserDTO userDTO) {
        log.info("Request received at createUser.");
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(userDTO));
    }

    @PatchMapping
    public ResponseEntity<UserDTO> updatePassword(
            @RequestParam("email") String email,
            @RequestBody Map<String, Object> updates) {
        log.info("Request received at updatePassword.");
        return ResponseEntity.ok(userService.updatePassword(email, updates));
    }

    @PatchMapping("/availableCredit/{userId}")
    public ResponseEntity<String> updateAvailableCredit(
            @PathVariable("userId") int userId,
            @RequestParam("availableCredit") double availableCredit) {
        log.info("Request received to update available credit.");
        boolean updateSuccess = userService.updateAvailableCredit(userId, availableCredit);
        if (updateSuccess) {
            return new ResponseEntity<>("Available credit updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to update available credit", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/validate")
    public String validateToken(@RequestParam("token") String token) {
        jwtService.validateToken(token);
        return "Token is valid";
    }

    @PostMapping("/login")
    public ResponseEntity<String> getToken(@RequestBody Auth auth) {
        if(auth.getEmail()!=null && auth.getPassword()!=null) {
            String result =  jwtService.generateToken(auth.getEmail(),auth.getPassword());
            if(!result.equals("Unable to generate token")){
                return new ResponseEntity<>(result,HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>("Unable to generate token",HttpStatus.NOT_FOUND);
            }
        }
        else
            return new ResponseEntity<>("Either of email or password is null",HttpStatus.NOT_FOUND);
    }

}