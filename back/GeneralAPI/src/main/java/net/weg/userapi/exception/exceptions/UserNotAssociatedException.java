package net.weg.userapi.exception.exceptions;

public class UserNotAssociatedException extends RuntimeException{

    public UserNotAssociatedException() {
        super();
    }

    public UserNotAssociatedException(String message) {
        super(message);
    }
}
