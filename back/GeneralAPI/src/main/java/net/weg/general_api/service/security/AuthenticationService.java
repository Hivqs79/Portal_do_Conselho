package net.weg.general_api.service.security;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.request.LoginRequestDTO;
import net.weg.general_api.model.dto.request.RegisterRequestDTO;
import net.weg.general_api.model.entity.users.Pedagogic;
import net.weg.general_api.model.entity.users.User;
import net.weg.general_api.model.entity.users.UserAuthentication;
import net.weg.general_api.model.enums.RoleENUM;
import net.weg.general_api.repository.PedagogicRepository;
import net.weg.general_api.repository.UserAuthenticationRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final TokenService tokenService;

    private final UserAuthenticationRepository userAuthenticationRepository;
    private final PedagogicRepository pedagogicRepository;

    public String login(LoginRequestDTO loginRequestDTO) {

        var authenticationToken = new UsernamePasswordAuthenticationToken(loginRequestDTO.username(), loginRequestDTO.password());
        Authentication auth = authenticationManager.authenticate(authenticationToken);

        var token = tokenService.generateToken((UserAuthentication) auth.getPrincipal());

        return token;
    }

    public static String encodePassword (String passwordPlainText) {
        return passwordEncoder.encode(passwordPlainText);
    }

    /*
    public User register(RegisterRequestDTO registerRequestDTO) {

        UserAuthentication userAuthentication = UserAuthentication.builder()
                .username(registerRequestDTO.username())
                .password(passwordEncoder.encode(registerRequestDTO.password()))
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .role(RoleENUM.PEDAGOGIC)
                .build();

        userAuthenticationRepository.save(userAuthentication);

        Pedagogic user = new Pedagogic();
        user.setName(registerRequestDTO.name());
        user.setUserAuthentication(userAuthentication);

        pedagogicRepository.save(user);

        return user;
    }

     */

}
