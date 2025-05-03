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

package net.weg.general_api.service.security;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.InvalidTokenException;
import net.weg.general_api.exception.exceptions.PasswordDoesntMatchException;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.dto.request.users.LoginRequestDTO;
import net.weg.general_api.model.dto.request.users.ModifyUserPasswordRequestDTO;
import net.weg.general_api.model.dto.response.LoginResponseDTO;
import net.weg.general_api.model.dto.response.ModifyUserRoleRequestDTO;
import net.weg.general_api.model.dto.response.users.UserAuthenticationResponseDTO;
import net.weg.general_api.model.entity.users.User;
import net.weg.general_api.model.entity.users.UserAuthentication;
import net.weg.general_api.model.enums.RoleENUM;
import net.weg.general_api.repository.PedagogicRepository;
import net.weg.general_api.repository.UserAuthenticationRepository;
import net.weg.general_api.service.users.UserAuthenticationService;
import net.weg.general_api.service.users.UserService;
import org.modelmapper.ModelMapper;
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
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final UserAuthenticationRepository userAuthenticationRepository;

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
            throw new InvalidTokenException("Token invalid");
        }

        UserAuthentication user = userAuthenticationService.findUserAuthentication(userDetails.getUsername());

        if (!passwordEncoder.matches(request.oldPassword(), user.getPassword())) {
            throw new PasswordDoesntMatchException("Senha incorreta");
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

    public UserAuthenticationResponseDTO changeRole(ModifyUserRoleRequestDTO modifyUserRoleRequestDTO, Long id) {

        User userToChange = userService.findUserEntity(id);
        userToChange.getUserAuthentication().setRole(RoleENUM.valueOf(modifyUserRoleRequestDTO.newRole()));
        userAuthenticationRepository.save(userToChange.getUserAuthentication());

        return modelMapper.map(userToChange.getUserAuthentication(), UserAuthenticationResponseDTO.class);
    }
}
