package net.weg.general_api.exception.exceptions;

import org.springframework.web.client.RestClientException;

public class EmailServiceUnavailableException extends RuntimeException {
    public EmailServiceUnavailableException(String message, Throwable cause) {
        super(message, cause);
    }
}