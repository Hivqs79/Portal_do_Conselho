package net.weg.general_api.service.security;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.dto.request.users.LoginRequestDTO;
import net.weg.general_api.model.dto.request.users.ModifyUserPasswordRequestDTO;
import net.weg.general_api.model.dto.response.LoginResponseDTO;
import net.weg.general_api.model.dto.response.users.UserAuthenticationResponseDTO;
import net.weg.general_api.model.entity.users.UserAuthentication;
import net.weg.general_api.model.enums.RoleENUM;
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

    public LoginResponseDTO login(LoginRequestDTO loginRequestDTO) {

        var authenticationToken = new UsernamePasswordAuthenticationToken(loginRequestDTO.username(), loginRequestDTO.password());
        Authentication auth = authenticationManager.authenticate(authenticationToken);

        UserAuthentication userAuth = (UserAuthentication) auth.getPrincipal();

        var token = tokenService.generateToken(userAuth);
        Long userId = userAuth.getUser().getId();
        RoleENUM role = userAuth.getRole();
        String name = userAuth.getUser().getName();

        return new LoginResponseDTO(token, userId, role, name);
    }

    public static String encodePassword(String passwordPlainText) {
        return passwordEncoder.encode(passwordPlainText);
    }

    public UserAuthenticationResponseDTO changePassword(UserDetails userDetails, ModifyUserPasswordRequestDTO request) {

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
        UserAuthenticationResponseDTO userAuthenticationResponseDTO = new UserAuthenticationResponseDTO();
        userAuthenticationResponseDTO.setId(user.getId());
        userAuthenticationResponseDTO.setUsername(user.getUsername());
        userAuthenticationResponseDTO.setAccountNonExpired(user.isAccountNonExpired());
        userAuthenticationResponseDTO.setCredentialsNonExpired(user.isCredentialsNonExpired());
        userAuthenticationResponseDTO.setEnabled(user.isEnabled());
        userAuthenticationResponseDTO.setRole(user.getRole());

        userAuthenticationService.saveUserAuthentication(user);

        return userAuthenticationResponseDTO;
    }
}
