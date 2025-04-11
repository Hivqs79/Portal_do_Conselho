package net.weg.general_api.service.security;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.request.LoginRequestDTO;
import net.weg.general_api.model.dto.request.RegisterRequestDTO;
import net.weg.general_api.model.entity.users.User;
import net.weg.general_api.model.entity.users.UserAuthentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public String login(LoginRequestDTO loginRequestDTO) {

        var authenticationToken = new UsernamePasswordAuthenticationToken(loginRequestDTO.username(), loginRequestDTO.password());
        Authentication auth = authenticationManager.authenticate(authenticationToken);

        return "";
    }

    public User register(RegisterRequestDTO registerRequestDTO) {

        UserAuthentication userAuthentication = UserAuthentication.builder()
                .username(registerRequestDTO.username())
                .password(passwordEncoder.encode(registerRequestDTO.password()))
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .build();

        return null;
    }

}
