package net.weg.userapi.exception.exceptions;

public class ClassNotFoundException extends RuntimeException{

    public ClassNotFoundException() {
        super();
    }

    public ClassNotFoundException(String message) {
        super(message);
    }
}
