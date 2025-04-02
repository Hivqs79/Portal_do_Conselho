package spring.emailsenderapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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
    @Operation(method = "POST", summary = "Send email", description = "Returns sent email")
    @ApiResponse(responseCode = "201", description = "Email sent successfully",
            content = @Content(schema = @Schema(implementation = EmailModel.class),
                    examples = @ExampleObject(value = "{\"id\":\"1\",\"owner\":\"Fulano\",\"sender\":\"portal.do.conselho.email@gmail.com\"," +
                            "\"reciver\":\"fulano@gmail.com\", \"title\": \"Assunto do Email\", \"content\": \"Conteudo do email\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<EmailModel> senderEmail(@Valid @RequestBody EmailModel email){
        EmailModel message = service.sendEmail(email);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }
}
