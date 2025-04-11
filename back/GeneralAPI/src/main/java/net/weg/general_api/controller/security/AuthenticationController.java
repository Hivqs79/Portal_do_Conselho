package net.weg.general_api.controller.security;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.request.LoginRequestDTO;
import net.weg.general_api.service.security.AuthenticationService;
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

}
