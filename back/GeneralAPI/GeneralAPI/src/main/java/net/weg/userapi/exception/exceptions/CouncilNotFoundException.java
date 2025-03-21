package net.weg.userapi.exception.exceptions;

public class CouncilNotFoundException extends RuntimeException{

    public CouncilNotFoundException() {
        super();
    }

    public CouncilNotFoundException(String message) {
        super(message);
    }
}
