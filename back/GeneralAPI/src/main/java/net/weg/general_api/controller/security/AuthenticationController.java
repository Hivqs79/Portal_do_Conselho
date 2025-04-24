package net.weg.general_api.controller.security;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.request.users.LoginRequestDTO;
import net.weg.general_api.model.dto.request.users.ModifyUserPasswordRequestDTO;
import net.weg.general_api.model.dto.response.LoginResponseDTO;
import net.weg.general_api.model.dto.response.ModifyUserRoleRequestDTO;
import net.weg.general_api.model.dto.response.users.UserAuthenticationResponseDTO;
import net.weg.general_api.model.entity.users.UserAuthentication;
import net.weg.general_api.service.security.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@Tag(name = "Authentication Controller", description = "Controller para gerenciamento da autenticação do sistema")
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/login")
    @Operation(method = "POST", summary = "Autenticar usuário", description = "Realiza o login e retorna um token JWT no formato DTO")
    @ApiResponse(responseCode = "200", description = "Autenticação bem-sucedida", content = @Content(schema = @Schema(implementation = LoginResponseDTO.class), examples = @ExampleObject(value = "{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\"}")))
    @ApiResponse(responseCode = "401", description = "Credenciais inválidas", content = @Content(examples = @ExampleObject(value = "{\"status\":401,\"error\":\"Unauthorized\",\"message\":\"Credenciais inválidas\"}")))
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Bad Request\",\"message\":[\"username: must not be blank\",\"password: must not be blank\"]}")))
    @ApiResponse(responseCode = "403", description = "Conta desativada", content = @Content(examples = @ExampleObject(value = "{\"status\":403,\"error\":\"Forbidden\",\"message\":\"Conta desativada\"}")))
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Validated LoginRequestDTO loginRequestDTO) {
        return new ResponseEntity<>(service.login(loginRequestDTO), HttpStatus.OK);
    }

    @PostMapping("/change-password")
    @Operation(method = "POST", summary = "Alterar senha", description = "Altera a senha do usuário autenticado")
    @ApiResponse(responseCode = "200", description = "Senha alterada com sucesso", content = @Content(schema = @Schema(implementation = UserAuthentication.class), examples = @ExampleObject(value = "{\"id\":1,\"username\":\"user@example.com\",\"enabled\":true}")))
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Bad Request\",\"message\":[\"currentPassword: must not be blank\",\"newPassword: size must be between 6 and 20 characters\"]}")))
    @ApiResponse(responseCode = "401", description = "Não autorizado", content = @Content(examples = @ExampleObject(value = "{\"status\":401,\"error\":\"Unauthorized\",\"message\":\"Credenciais inválidas\"}")))
    @ApiResponse(responseCode = "403", description = "Senha atual incorreta", content = @Content(examples = @ExampleObject(value = "{\"status\":403,\"error\":\"Forbidden\",\"message\":\"Senha atual não confere\"}")))
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    public ResponseEntity<UserAuthenticationResponseDTO> changePassword(@RequestBody @Validated ModifyUserPasswordRequestDTO modifyUserPasswordRequestDTO, @AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(service.changePassword(userDetails, modifyUserPasswordRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/change-role/{id}")
    @Operation(method = "PUT", summary = "Alterar role", description = "Altera a role de algum usuário")
    @ApiResponse(responseCode = "200", description = "Senha alterada com sucesso", content = @Content(schema = @Schema(implementation = UserAuthentication.class), examples = @ExampleObject(value = "{\"id\":1,\"username\":\"user@example.com\",\"enabled\":true}")))
    @ApiResponse(responseCode = "400", description = "Dados inválidos", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Bad Request\",\"message\":[\"currentPassword: must not be blank\",\"newPassword: size must be between 6 and 20 characters\"]}")))
    @ApiResponse(responseCode = "401", description = "Não autorizado", content = @Content(examples = @ExampleObject(value = "{\"status\":401,\"error\":\"Unauthorized\",\"message\":\"Credenciais inválidas\"}")))
    @ApiResponse(responseCode = "403", description = "Senha atual incorreta", content = @Content(examples = @ExampleObject(value = "{\"status\":403,\"error\":\"Forbidden\",\"message\":\"Senha atual não confere\"}")))
    @ApiResponse(responseCode = "500", description = "Erro interno do servidor")
    public ResponseEntity<UserAuthenticationResponseDTO> changeRole(@RequestBody @Validated ModifyUserRoleRequestDTO modifyUserRoleRequestDTO, @PathVariable Long id) {
        return new ResponseEntity<>(service.changeRole(modifyUserRoleRequestDTO, id), HttpStatus.OK);
    }
}
