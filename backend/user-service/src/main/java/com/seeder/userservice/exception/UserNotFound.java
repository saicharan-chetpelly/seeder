package com.seeder.userservice.exception;

public class UserNotFound extends RuntimeException{
    public UserNotFound( String message){
        super(message);
    }
}