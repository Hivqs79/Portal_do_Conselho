package net.weg.general_api.controller.security;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.request.ForgotPasswordRequestDTO;
import net.weg.general_api.model.dto.request.ResetPasswordRequestDTO;
import net.weg.general_api.model.dto.request.VerifyCodeRequestDTO;
import net.weg.general_api.service.security.PasswordRecoveryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/recovery")
@AllArgsConstructor
@Tag(name = "Password Recovery Controller", description = "Controller para gerenciamento da recuperação de senha")
public class PasswordRecoveryController {

    private final PasswordRecoveryService recoveryService;

    @PostMapping("/forgot-password")
    @Operation(summary = "Solicitar recuperação de senha",
            description = "Inicia o processo de recuperação enviando um código por e-mail")
    @ApiResponse(responseCode = "200", description = "Código enviado com sucesso (se o e-mail existir)")
    @ApiResponse(responseCode = "400", description = "Dados inválidos",
            content = @Content(examples = @ExampleObject(
                    value = "{\"status\":400,\"error\":\"Bad Request\",\"message\":\"E-mail inválido\"}")))
    @ApiResponse(responseCode = "429", description = "Muitas solicitações",
            content = @Content(examples = @ExampleObject(
                    value = "{\"status\":429,\"error\":\"Too Many Requests\",\"message\":\"Aguarde antes de tentar novamente\"}")))
    @ApiResponse(responseCode = "500", description = "Erro no servidor")
    public ResponseEntity<Void> forgotPassword(@RequestBody @Validated ForgotPasswordRequestDTO request) {
        recoveryService.initiatePasswordReset(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/verify-code")
    @Operation(summary = "Verificar código de recuperação",
            description = "Valida o código recebido por e-mail para recuperação de senha")
    @ApiResponse(responseCode = "200", description = "Código válido")
    @ApiResponse(responseCode = "400", description = "Código inválido ou expirado",
            content = @Content(examples = @ExampleObject(
                    value = "{\"status\":400,\"error\":\"Bad Request\",\"message\":\"Código inválido ou expirado\"}")))
    @ApiResponse(responseCode = "404", description = "E-mail não encontrado",
            content = @Content(examples = @ExampleObject(
                    value = "{\"status\":404,\"error\":\"Not Found\",\"message\":\"Nenhuma solicitação encontrada para este e-mail\"}")))
    @ApiResponse(responseCode = "500", description = "Erro no servidor")
    public ResponseEntity<Void> verifyResetCode(@RequestBody @Validated VerifyCodeRequestDTO request) {
        recoveryService.verifyResetCode(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Redefinir senha",
            description = "Cria uma nova senha após verificação do código")
    @ApiResponse(responseCode = "200", description = "Senha redefinida com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos",
            content = @Content(examples = @ExampleObject(
                    value = "{\"status\":400,\"error\":\"Bad Request\",\"message\":[\"Código inválido\",\"As senhas não coincidem\",\"Senha muito fraca\"]}")))
    @ApiResponse(responseCode = "403", description = "Código já utilizado ou expirado",
            content = @Content(examples = @ExampleObject(
                    value = "{\"status\":403,\"error\":\"Forbidden\",\"message\":\"Código já utilizado ou expirado\"}")))
    @ApiResponse(responseCode = "500", description = "Erro no servidor")
    public ResponseEntity<Void> resetPassword(@RequestBody @Validated ResetPasswordRequestDTO request) {
        recoveryService.resetPassword(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}