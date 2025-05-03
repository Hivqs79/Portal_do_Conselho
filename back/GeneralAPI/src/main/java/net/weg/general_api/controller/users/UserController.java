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

package net.weg.general_api.controller.users;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "User Controller", description = "Controller para gerenciamento dos registros dos usuários")
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