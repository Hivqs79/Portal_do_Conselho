package net.weg.general_api.service.security;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.request.ForgotPasswordRequestDTO;
import net.weg.general_api.model.dto.request.ResetPasswordRequestDTO;
import net.weg.general_api.model.dto.request.VerifyCodeRequestDTO;
import net.weg.general_api.model.entity.security.PasswordResetToken;
import net.weg.general_api.model.entity.users.UserAuthentication;
import net.weg.general_api.repository.PasswordResetTokenRepository;
import net.weg.general_api.repository.UserAuthenticationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@AllArgsConstructor
public class PasswordRecoveryService {

    private final UserAuthenticationRepository userAuthenticationRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailApiClient emailApiClient;

    // Gerar código aleatório de 6 dígitos
    private String generateVerificationCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }

    public ResponseEntity<?> initiatePasswordReset(ForgotPasswordRequestDTO request) {
        // Buscar usuário pelo email (username)
        UserAuthentication user = userAuthenticationRepository.findByUsername(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        // Invalidar tokens anteriores não usados
        passwordResetTokenRepository.findByUserAuthenticationAndUsedFalse(user)
                .ifPresent(token -> {
                    token.setUsed(true);
                    passwordResetTokenRepository.save(token);
                });

        // Gerar novo token
        String code = generateVerificationCode();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(code)
                .userAuthentication(user)
                .expiryDate(LocalDateTime.now().plusHours(1))
                .build();

        passwordResetTokenRepository.save(resetToken);

        emailApiClient.sendCodeEmail(
                request.email(),
                user.getUser().getName(), // Assumindo que existe um campo name no DTO
                code
        );

        System.out.println("Código: " + code);

        return ResponseEntity.ok("Código de verificação enviado para o email");
    }

    public ResponseEntity<?> verifyResetCode(VerifyCodeRequestDTO request) {
        UserAuthentication user = userAuthenticationRepository.findByUsername(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        PasswordResetToken token = passwordResetTokenRepository.findByToken(request.code())
                .orElseThrow(() -> new RuntimeException("Código inválido"));

        if (!token.getUserAuthentication().equals(user)) {
            return ResponseEntity.badRequest().body("Código inválido para este usuário");
        }

        if (token.isExpired()) {
            return ResponseEntity.badRequest().body("Código expirado");
        }

        if (token.isUsed()) {
            return ResponseEntity.badRequest().body("Código já utilizado");
        }

        return ResponseEntity.ok("Código válido");
    }

    public ResponseEntity<?> resetPassword(ResetPasswordRequestDTO request) {
        // Validar usuário e token
        UserAuthentication user = userAuthenticationRepository.findByUsername(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        PasswordResetToken token = passwordResetTokenRepository.findByToken(request.code())
                .orElseThrow(() -> new RuntimeException("Código inválido"));

        if (!token.getUserAuthentication().equals(user)) {
            return ResponseEntity.badRequest().body("Código inválido para este usuário");
        }

        if (token.isExpired()) {
            return ResponseEntity.badRequest().body("Código expirado");
        }

        if (token.isUsed()) {
            return ResponseEntity.badRequest().body("Código já utilizado");
        }

        // Atualizar senha
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userAuthenticationRepository.save(user);

        // Marcar token como usado
        token.setUsed(true);
        passwordResetTokenRepository.save(token);

        return ResponseEntity.ok("Senha redefinida com sucesso");
    }
}