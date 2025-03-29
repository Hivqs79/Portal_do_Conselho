package net.weg.userapi.controller.users;

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
import net.weg.userapi.model.dto.request.users.AdminRequestDTO;
import net.weg.userapi.model.dto.response.users.AdminResponseDTO;
import net.weg.userapi.model.entity.users.Admin;
import net.weg.userapi.service.users.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {

    private AdminService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search admins with filters", description = "Returns paginated list of admins based on search criteria")
    @ApiResponse(responseCode = "200", description = "Admins found successfully",
            content = @Content(schema = @Schema(implementation = Page.class),
                    examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"name\":\"Admin 1\",\"email\":\"admin1@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T10:00:00\"}],\"pageable\":{\"sort\":{\"empty\":true,\"unsorted\":true,\"sorted\":false},\"offset\":0,\"pageNumber\":0,\"pageSize\":10,\"unpaged\":false,\"paged\":true},\"last\":true,\"totalPages\":1,\"totalElements\":1,\"size\":10,\"number\":0,\"sort\":{\"empty\":true,\"unsorted\":true,\"sorted\":false},\"first\":true,\"numberOfElements\":1,\"empty\":false}")))
    @ApiResponse(responseCode = "400", description = "Invalid search parameters")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public Page<AdminResponseDTO> searchAdmin(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "name", spec = Like.class),
                    @Spec(path = "email", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<Admin> spec, Pageable pageable) {
        return service.findAdminSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create new admin", description = "Creates and returns the new admin")
    @ApiResponse(responseCode = "200", description = "Admin created successfully",
            content = @Content(schema = @Schema(implementation = AdminResponseDTO.class),
                    examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Novo Admin\",\"email\":\"novo@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T10:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid input data",
            content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"name: must not be blank\",\"email: must be a valid email\"]}")))
    @ApiResponse(responseCode = "409", description = "Email already exists")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<AdminResponseDTO> postAdmin(@RequestBody @Validated AdminRequestDTO adminRequestDTO) {
        return new ResponseEntity<>(service.createAdmin(adminRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update admin", description = "Updates and returns the updated admin")
    @ApiResponse(responseCode = "200", description = "Admin updated successfully",
            content = @Content(schema = @Schema(implementation = AdminResponseDTO.class),
                    examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Admin Atualizado\",\"email\":\"atualizado@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T11:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid input data")
    @ApiResponse(responseCode = "404", description = "Admin not found")
    @ApiResponse(responseCode = "409", description = "Email already exists")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<AdminResponseDTO> putAdmin(
            @RequestBody @Validated AdminRequestDTO adminRequestDTO,
            @Parameter(description = "ID of the admin to be updated", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updateAdmin(adminRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable admin", description = "Disables an admin and returns the disabled admin")
    @ApiResponse(responseCode = "200", description = "Admin disabled successfully",
            content = @Content(schema = @Schema(implementation = AdminResponseDTO.class),
                    examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Admin Inativo\",\"email\":\"inativo@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T12:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Admin not found")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<AdminResponseDTO> disableAdmin(
            @Parameter(description = "ID of the admin to be disabled", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disableAdmin(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get admin by ID", description = "Returns admin details by ID")
    @ApiResponse(responseCode = "200", description = "Admin found successfully",
            content = @Content(schema = @Schema(implementation = AdminResponseDTO.class),
                    examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Admin 1\",\"email\":\"admin1@example.com\",\"createDate\":\"2025-03-28T10:00:00\",\"updateDate\":\"2025-03-28T10:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Admin not found")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<AdminResponseDTO> getAdmin(
            @Parameter(description = "ID of the admin to be retrieved", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findAdmin(id), HttpStatus.OK);
    }

    @PostMapping("/mock")
    public ResponseEntity<Void> postAllAdmin(@RequestBody List<AdminRequestDTO> adminRequestDTOS) {
        service.mockarAdmin(adminRequestDTOS);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
