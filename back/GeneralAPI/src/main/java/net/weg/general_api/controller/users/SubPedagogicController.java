package net.weg.general_api.controller.users;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.general_api.model.dto.request.users.UserRequestDTO;
import net.weg.general_api.model.dto.response.users.UserResponseDTO;
import net.weg.general_api.model.entity.users.SubPedagogic;
import net.weg.general_api.service.users.SubPedagogicService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subPedagogic")
@AllArgsConstructor
public class SubPedagogicController {

    private SubPedagogicService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search subPedagogics with filters", description = "Returns paginated list of subPedagogics based on search criteria")
    @ApiResponse(responseCode = "200", description = "SubPedagogics found successfully",
            content = @Content(schema = @Schema(implementation = Page.class),
                    examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"name\":\"SubPedagogic 1\",\"email\":\"subPedagogic1@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T10:00:00\"}],\"pageable\":{\"sort\":{\"empty\":true,\"unsorted\":true,\"sorted\":false},\"offset\":0,\"pageNumber\":0,\"pageSize\":10,\"unpaged\":false,\"paged\":true},\"last\":true,\"totalPages\":1,\"totalElements\":1,\"size\":10,\"number\":0,\"sort\":{\"empty\":true,\"unsorted\":true,\"sorted\":false},\"first\":true,\"numberOfElements\":1,\"empty\":false}")))
    @ApiResponse(responseCode = "400", description = "Invalid search parameters")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public Page<UserResponseDTO> searchSubPedagogic(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "name", spec = Like.class),
                    @Spec(path = "email", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<SubPedagogic> spec, Pageable pageable) {
        return service.findSubPedagogicSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create new subPedagogic", description = "Creates and returns the new subPedagogic")
    @ApiResponse(responseCode = "200", description = "SubPedagogic created successfully",
            content = @Content(schema = @Schema(implementation = UserResponseDTO.class),
                    examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Novo SubPedagogic\",\"email\":\"novo@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T10:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid input data",
            content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"name: must not be blank\",\"email: must be a valid email\"]}")))
    @ApiResponse(responseCode = "409", description = "Email already exists")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<UserResponseDTO> postSubPedagogic(@RequestBody @Validated UserRequestDTO userRequestDTO) {
        return new ResponseEntity<>(service.createSubPedagogic(userRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update subPedagogic", description = "Updates and returns the updated subPedagogic")
    @ApiResponse(responseCode = "200", description = "SubPedagogic updated successfully",
            content = @Content(schema = @Schema(implementation = UserResponseDTO.class),
                    examples = @ExampleObject(value = "{\"id\":1,\"name\":\"SubPedagogic Atualizado\",\"email\":\"atualizado@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T11:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid input data")
    @ApiResponse(responseCode = "404", description = "SubPedagogic not found")
    @ApiResponse(responseCode = "409", description = "Email already exists")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<UserResponseDTO> putSubPedagogic(
            @RequestBody @Validated UserRequestDTO userRequestDTO,
            @Parameter(description = "ID of the subPedagogic to be updated", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updateSubPedagogic(userRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable subPedagogic", description = "Disables an subPedagogic and returns the disabled subPedagogic")
    @ApiResponse(responseCode = "200", description = "SubPedagogic disabled successfully",
            content = @Content(schema = @Schema(implementation = UserResponseDTO.class),
                    examples = @ExampleObject(value = "{\"id\":1,\"name\":\"SubPedagogic Inativo\",\"email\":\"inativo@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T12:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "SubPedagogic not found")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<UserResponseDTO> disableSubPedagogic(
            @Parameter(description = "ID of the subPedagogic to be disabled", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disableSubPedagogic(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get subPedagogic by ID", description = "Returns subPedagogic details by ID")
    @ApiResponse(responseCode = "200", description = "SubPedagogic found successfully",
            content = @Content(schema = @Schema(implementation = UserResponseDTO.class),
                    examples = @ExampleObject(value = "{\"id\":1,\"name\":\"SubPedagogic 1\",\"email\":\"subPedagogic1@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T10:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "SubPedagogic not found")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<UserResponseDTO> getSubPedagogic(
            @Parameter(description = "ID of the subPedagogic to be retrieved", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findSubPedagogic(id), HttpStatus.OK);
    }

}
