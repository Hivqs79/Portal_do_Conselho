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
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.general_api.model.dto.request.users.UserRequestDTO;
import net.weg.general_api.model.dto.response.users.UserResponseDTO;
import net.weg.general_api.model.entity.users.Supervisor;
import net.weg.general_api.service.users.SupervisorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/supervisor")
@AllArgsConstructor
@Tag(name = "Supervisor Controller", description = "Controller para gerenciamento dos registros dos supervisores")
public class SupervisorController {

    private SupervisorService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search supervisors with filters", description = "Returns paginated list of supervisors based on search criteria")
    @ApiResponse(responseCode = "200", description = "Supervisors found successfully",
            content = @Content(schema = @Schema(implementation = Page.class),
                    examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"name\":\"Supervisor 1\",\"email\":\"supervisor1@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T10:00:00\"}],\"pageable\":{\"sort\":{\"empty\":true,\"unsorted\":true,\"sorted\":false},\"offset\":0,\"pageNumber\":0,\"pageSize\":10,\"unpaged\":false,\"paged\":true},\"last\":true,\"totalPages\":1,\"totalElements\":1,\"size\":10,\"number\":0,\"sort\":{\"empty\":true,\"unsorted\":true,\"sorted\":false},\"first\":true,\"numberOfElements\":1,\"empty\":false}")))
    @ApiResponse(responseCode = "400", description = "Invalid search parameters")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public Page<UserResponseDTO> searchSupervisor(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "name", spec = Like.class),
                    @Spec(path = "email", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<Supervisor> spec, Pageable pageable) {
        return service.findSupervisorSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create new supervisor", description = "Creates and returns the new supervisor")
    @ApiResponse(responseCode = "200", description = "Supervisor created successfully",
            content = @Content(schema = @Schema(implementation = UserResponseDTO.class),
                    examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Novo Supervisor\",\"email\":\"novo@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T10:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid input data",
            content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"name: must not be blank\",\"email: must be a valid email\"]}")))
    @ApiResponse(responseCode = "409", description = "Email already exists")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<UserResponseDTO> postSupervisor(@RequestBody @Validated UserRequestDTO userRequestDTO) {
        return new ResponseEntity<>(service.createSupervisor(userRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update supervisor", description = "Updates and returns the updated supervisor")
    @ApiResponse(responseCode = "200", description = "Supervisor updated successfully",
            content = @Content(schema = @Schema(implementation = UserResponseDTO.class),
                    examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Supervisor Atualizado\",\"email\":\"atualizado@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T11:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid input data")
    @ApiResponse(responseCode = "404", description = "Supervisor not found")
    @ApiResponse(responseCode = "409", description = "Email already exists")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<UserResponseDTO> putSupervisor(
            @RequestBody @Validated UserRequestDTO userRequestDTO,
            @Parameter(description = "ID of the supervisor to be updated", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updateSupervisor(userRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable supervisor", description = "Disables an supervisor and returns the disabled supervisor")
    @ApiResponse(responseCode = "200", description = "Supervisor disabled successfully",
            content = @Content(schema = @Schema(implementation = UserResponseDTO.class),
                    examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Supervisor Inativo\",\"email\":\"inativo@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T12:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Supervisor not found")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<UserResponseDTO> disableSupervisor(
            @Parameter(description = "ID of the supervisor to be disabled", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disableSupervisor(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get supervisor by ID", description = "Returns supervisor details by ID")
    @ApiResponse(responseCode = "200", description = "Supervisor found successfully",
            content = @Content(schema = @Schema(implementation = UserResponseDTO.class),
                    examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Supervisor 1\",\"email\":\"supervisor1@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T10:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Supervisor not found")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<UserResponseDTO> getSupervisor(
            @Parameter(description = "ID of the supervisor to be retrieved", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findSupervisor(id), HttpStatus.OK);
    }

}
