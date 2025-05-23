/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.weg.general_api.exception;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.response.exceptions.ExceptionResponseDTO;
import net.weg.general_api.model.dto.response.exceptions.ValidationResponseDTO;
import org.springframework.context.MessageSource;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
@AllArgsConstructor
public class ExceptionHandlerController {

    private MessageSource messageSource;

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ExceptionResponseDTO> handleUserNotFoundException(RuntimeException ex, WebRequest request) {
        ExceptionResponseDTO response = new ExceptionResponseDTO(
                HttpStatus.NOT_FOUND.value(),
                "Client side error",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", ""),
                ex.getClass(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(JWTVerificationException.class)
    public ResponseEntity<ExceptionResponseDTO> handleTokenExpired(JWTVerificationException ex, WebRequest request) {
        ExceptionResponseDTO response = new ExceptionResponseDTO(
                HttpStatus.REQUEST_TIMEOUT.value(),
                "Token expired",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", ""),
                ex.getClass(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(response, HttpStatus.REQUEST_TIMEOUT);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationResponseDTO> handleValidationExceptions(MethodArgumentNotValidException ex, WebRequest request) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> {
                    String message = messageSource.getMessage(error, request.getLocale());
                    return error.getField() + ": " + message;
                })
                .collect(Collectors.toList());

        ValidationResponseDTO response = new ValidationResponseDTO(
                HttpStatus.BAD_REQUEST.value(),
                "Validation error",
                errors,
                request.getDescription(false).replace("uri=", ""),
                ex.getClass(),
                LocalDateTime.now()
        );

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionResponseDTO> handleDataIntegrityViolationException(DataIntegrityViolationException ex, WebRequest request) {
        String errorMessage = "Database error: " + ex.getMostSpecificCause().getMessage();

        ExceptionResponseDTO response = new ExceptionResponseDTO(
                HttpStatus.CONFLICT.value(),
                "Database error",
                errorMessage,
                request.getDescription(false).replace("uri=", ""),
                ex.getClass(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionResponseDTO> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex, WebRequest request) {
        String errorMessage = "Area input content error: " + ex.getMostSpecificCause().getMessage();

        ExceptionResponseDTO response = new ExceptionResponseDTO(
                HttpStatus.CONFLICT.value(),
                "ENUM input error",
                errorMessage,
                request.getDescription(false).replace("uri=", ""),
                ex.getClass(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponseDTO> handleGenericException(Exception ex, WebRequest request) {
        ExceptionResponseDTO response = new ExceptionResponseDTO(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                ex.getMessage(),
                request.getDescription(false).replace("uri=", ""),
                ex.getClass(),
                LocalDateTime.now()
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
