package net.weg.general_api.controller.users;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.response.users.UserResponseDTO;
import net.weg.general_api.model.entity.users.User;
import net.weg.general_api.service.users.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {
    private UserService service;

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get user by ID", description = "Returns user details by ID")
    @ApiResponse(responseCode = "200", description = "User found successfully",
            content = @Content(schema = @Schema(implementation = UserResponseDTO.class),
                    examples = @ExampleObject(value = "{\"id\":1,\"name\":\"User 1\",\"email\":\"user1@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T10:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "User not found")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(service.findUser(id), HttpStatus.OK);
    }
}