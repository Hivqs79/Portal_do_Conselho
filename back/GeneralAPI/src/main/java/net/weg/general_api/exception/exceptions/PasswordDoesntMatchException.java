package net.weg.general_api.exception.exceptions;

public class PasswordDoesntMatchException extends RuntimeException {

    public PasswordDoesntMatchException(String message) {
        super(message);
    }
}
