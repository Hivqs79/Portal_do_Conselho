package net.weg.general_api.controller.security;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.request.users.LoginRequestDTO;
import net.weg.general_api.model.dto.request.users.ModifyUserPasswordRequestDTO;
import net.weg.general_api.model.entity.users.UserAuthentication;
import net.weg.general_api.service.security.AuthenticationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequestDTO loginRequestDTO) {
        return service.login(loginRequestDTO);
    }

    @PostMapping("/change-password")
    public ResponseEntity<UserAuthentication> changePassword(
            @RequestBody ModifyUserPasswordRequestDTO modifyUserPasswordRequestDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        return new ResponseEntity<>(service.changePassword(userDetails, modifyUserPasswordRequestDTO), HttpStatus.OK);
    }

}
