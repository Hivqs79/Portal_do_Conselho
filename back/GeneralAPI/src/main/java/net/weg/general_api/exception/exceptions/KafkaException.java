package net.weg.general_api.exception.exceptions;

public class KafkaException extends RuntimeException {

    public KafkaException(String message) {
        super(message);
    }
}
