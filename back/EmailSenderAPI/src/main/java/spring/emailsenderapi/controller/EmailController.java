package spring.emailsenderapi.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.emailsenderapi.model.EmailModel;
import spring.emailsenderapi.service.EmailService;

@RestController
@RequestMapping("/email")
@AllArgsConstructor
public class EmailController {

    private EmailService service;

    @PostMapping("/send")
    public ResponseEntity<EmailModel> senderEmail(@Valid @RequestBody EmailModel email){
        EmailModel message = service.sendEmail(email);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }
}
