package net.weg.general_api.service.security;

import com.auth0.jwt.exceptions.TokenExpiredException;
import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.InvalidTokenException;
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
import java.time.ZoneOffset;
import java.util.Random;

@Service
@AllArgsConstructor
public class PasswordRecoveryService {

    private final UserAuthenticationRepository userAuthenticationRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailApiClient emailApiClient;
    private final EmailService emailService;


    private String generateVerificationCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));
    }

    public void initiatePasswordReset(ForgotPasswordRequestDTO request) {
        UserAuthentication user = userAuthenticationRepository.findByUsername(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        passwordResetTokenRepository.findByUserAuthenticationAndUsedFalse(user)
                .ifPresent(token -> {
                    token.setUsed(true);
                    passwordResetTokenRepository.save(token);
                });

        String code = generateVerificationCode();
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .token(code)
                .userAuthentication(user)
                .expiryDate(LocalDateTime.now().plusHours(1))
                .build();

        passwordResetTokenRepository.save(resetToken);

        emailService.sendCodeEmailAsync(
                request.email(),
                user.getUser().getName(),
                code
        );

        System.out.println("Código: " + code);
    }

    public void verifyResetCode(VerifyCodeRequestDTO request) {
        UserAuthentication user = userAuthenticationRepository.findByUsername(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        PasswordResetToken token = passwordResetTokenRepository.findByToken(request.code())
                .orElseThrow(() -> new InvalidTokenException("Código inválido"));

        if (!token.getUserAuthentication().equals(user)) {
            throw new InvalidTokenException("Código inválido para este usuário");
        }

        if (token.isExpired()) {
            throw new TokenExpiredException("Token inspirado", token.getExpiryDate().toInstant(ZoneOffset.of("-03:00")));
        }

        if (token.isUsed()) {
            throw new InvalidTokenException("Código já utilizado");
        }

    }

    public void resetPassword(ResetPasswordRequestDTO request) {
        UserAuthentication user = userAuthenticationRepository.findByUsername(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        PasswordResetToken token = passwordResetTokenRepository.findByToken(request.code())
                .orElseThrow(() -> new InvalidTokenException("Código inválido"));

        if (!token.getUserAuthentication().equals(user)) {
            throw new InvalidTokenException("Código inválido para este usuário");
        }

        if (token.isExpired()) {
            throw new TokenExpiredException("Token inspirado", token.getExpiryDate().toInstant(ZoneOffset.of("-03:00")));
        }

        if (token.isUsed()) {
            throw new InvalidTokenException("Código já utilizado");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userAuthenticationRepository.save(user);

        token.setUsed(true);
        passwordResetTokenRepository.save(token);
    }
}