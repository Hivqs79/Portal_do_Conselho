package net.weg.userapi.exception.exceptions;

public class FeedbackNotFoundException extends RuntimeException{

    public FeedbackNotFoundException() {
        super();
    }

    public FeedbackNotFoundException(String message) {
        super(message);
    }
}
