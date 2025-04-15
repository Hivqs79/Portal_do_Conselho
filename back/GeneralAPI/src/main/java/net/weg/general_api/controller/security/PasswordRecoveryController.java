package net.weg.general_api.controller.security;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.request.ForgotPasswordRequestDTO;
import net.weg.general_api.model.dto.request.ResetPasswordRequestDTO;
import net.weg.general_api.model.dto.request.VerifyCodeRequestDTO;
import net.weg.general_api.service.security.PasswordRecoveryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/recovery")
@AllArgsConstructor
public class PasswordRecoveryController {

    private final PasswordRecoveryService recoveryService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequestDTO request) {
        return recoveryService.initiatePasswordReset(request);
    }

    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyResetCode(@RequestBody VerifyCodeRequestDTO request) {
        return recoveryService.verifyResetCode(request);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequestDTO request) {
        return recoveryService.resetPassword(request);
    }
}