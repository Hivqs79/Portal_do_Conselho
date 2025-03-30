package net.weg.general_api.exception.exceptions;

public class UserNotFoundException extends RuntimeException {


    public UserNotFoundException(String message) {
        super(message);
    }
}
