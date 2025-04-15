package net.weg.general_api.service.security;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.dto.request.users.LoginRequestDTO;
import net.weg.general_api.model.dto.request.users.ModifyUserPasswordRequestDTO;
import net.weg.general_api.model.entity.users.UserAuthentication;
import net.weg.general_api.repository.PedagogicRepository;
import net.weg.general_api.repository.UserAuthenticationRepository;
import net.weg.general_api.service.users.UserAuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final TokenService tokenService;

    private final UserAuthenticationService userAuthenticationService;

    public String login(LoginRequestDTO loginRequestDTO) {

        var authenticationToken = new UsernamePasswordAuthenticationToken(loginRequestDTO.username(), loginRequestDTO.password());
        Authentication auth = authenticationManager.authenticate(authenticationToken);

        var token = tokenService.generateToken((UserAuthentication) auth.getPrincipal());

        return token;
    }

    public static String encodePassword(String passwordPlainText) {
        return passwordEncoder.encode(passwordPlainText);
    }

    public UserAuthentication changePassword(UserDetails userDetails, ModifyUserPasswordRequestDTO request) {



        if (userDetails == null) {
            //TODO: nova exceção
            throw new RuntimeException("Token invalid");
        }

        UserAuthentication user = userAuthenticationService.findUserAuthentication(userDetails.getUsername());

        if (!passwordEncoder.matches(request.oldPassword(), user.getPassword())) {
            //TODO: nova exceção
            throw new RuntimeException("Senha incorreta");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userAuthenticationService.saveUserAuthentication(user);

        return user;
    }
}
