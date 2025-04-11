package net.weg.general_api.service.users;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.entity.users.UserAuthentication;
import net.weg.general_api.model.enums.RoleENUM;
import net.weg.general_api.repository.UserAuthenticationRepository;
import net.weg.general_api.service.security.AuthenticationService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserAuthenticationService {

    private final UserAuthenticationRepository repository;
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserAuthentication saveUserAuthentication (String username, String password, RoleENUM roleENUM) {

        UserAuthentication userAuthentication = UserAuthentication.builder()
                .username(username)
                .password(AuthenticationService.encodePassword(password))
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .role(roleENUM)
                .build();

        return repository.save(userAuthentication);
    }



}
