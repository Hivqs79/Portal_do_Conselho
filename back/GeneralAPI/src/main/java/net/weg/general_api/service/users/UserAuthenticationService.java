/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.weg.general_api.service.users;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
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

    public UserAuthentication findUserAuthentication (String username) {
        return repository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public UserAuthentication saveUserAuthentication (UserAuthentication userAuthentication) {
        return repository.save(userAuthentication);
    }

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
