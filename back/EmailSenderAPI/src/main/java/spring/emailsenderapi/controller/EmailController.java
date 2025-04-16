package spring.emailsenderapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.emailsenderapi.model.EmailModel;
import spring.emailsenderapi.service.AnswersService;
import spring.emailsenderapi.service.EmailService;

@RestController
@RequestMapping("/email")
@Tag(name = "Email", description = "Sender emails related operations")
@AllArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 */
public class EmailController {

    private EmailService service;
    private AnswersService answersService;

    @PostMapping("/send")
    @Operation(method = "POST", summary = "Send email", description = "Returns the email with the correct formatting of the content according to the subject")
    @ApiResponse(responseCode = "201", description = "Email sent successfully",
            content = @Content(schema = @Schema(implementation = EmailModel.class),
                    examples = @ExampleObject(value = "{\"id\":4,\"owner\":\"Fulano\",\"sender\":\"portal.do.conselho.email@gmail.com\",\"reciver\":\"fulano@gmail.com\",\"title\":\"Conselho Remarcado\",\"content\":\"Prezado(a) Professor(a) Vinicius,\\n\\nO conselho em que você foi convidado(a) a participar, da turma MI-74,\\nagendado para às 21:00 do dia 22/08/2007, foi agendado para às 21:00 do dia 22/08/2007.\\n\\nCaso deseje alterar alguma anotação, ainda será possível acessar o site para fazer anotações sobre a turma até o dia mostrado acima.\\n\\nAtenciosamente,\\nEquipe do Portal do Conselho\",\"date\":\"2007-08-23T00:00:00.000+00:00\",\"turma\":\"MI-74\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<EmailModel> senderEmail(@Valid @RequestBody EmailModel email){
        answersService.answers(email);
        EmailModel message = service.sendEmail(email);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }
}
