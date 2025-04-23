package net.weg.general_api.repository;

import net.weg.general_api.model.entity.security.PasswordResetToken;
import net.weg.general_api.model.entity.users.UserAuthentication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    Optional<PasswordResetToken> findByUserAuthenticationAndUsedFalse(UserAuthentication user);
}