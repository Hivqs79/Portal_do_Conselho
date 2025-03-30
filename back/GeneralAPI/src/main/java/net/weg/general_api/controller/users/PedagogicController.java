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
import net.weg.general_api.model.dto.request.users.PedagogicRequestDTO;
import net.weg.general_api.model.dto.response.users.PedagogicResponseDTO;
import net.weg.general_api.model.entity.users.Pedagogic;
import net.weg.general_api.service.users.PedagogicService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pedagogic")
@AllArgsConstructor
public class PedagogicController {

    private PedagogicService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search pedagogics", description = "Returns paginated pedagogics with filters")
    @ApiResponse(responseCode = "200", description = "Pedagogics found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"name\":\"Pedagogic\",\"email\":\"pedagogic@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<PedagogicResponseDTO> searchPedagogic(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "name", spec = Like.class), @Spec(path = "email", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<Pedagogic> spec, Pageable pageable) {
        return service.findPedagogicSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create pedagogic", description = "Creates new pedagogic")
    @ApiResponse(responseCode = "200", description = "Pedagogic created", content = @Content(schema = @Schema(implementation = PedagogicResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"New Pedagogic\",\"email\":\"new@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"name: must not be blank\",\"email: must be valid\"]}")))
    @ApiResponse(responseCode = "409", description = "Email exists")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PedagogicResponseDTO> postPedagogic(@RequestBody @Validated PedagogicRequestDTO pedagogicRequestDTO) {
        return new ResponseEntity<>(service.createPedagogic(pedagogicRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update pedagogic", description = "Updates existing pedagogic")
    @ApiResponse(responseCode = "200", description = "Pedagogic updated", content = @Content(schema = @Schema(implementation = PedagogicResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Updated Pedagogic\",\"email\":\"updated@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Pedagogic not found")
    @ApiResponse(responseCode = "409", description = "Email exists")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PedagogicResponseDTO> putPedagogic(@RequestBody @Validated PedagogicRequestDTO pedagogicRequestDTO, @Parameter(description = "Pedagogic ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updatePedagogic(pedagogicRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable pedagogic", description = "Disables pedagogic")
    @ApiResponse(responseCode = "200", description = "Pedagogic disabled", content = @Content(schema = @Schema(implementation = PedagogicResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Disabled Pedagogic\",\"email\":\"disabled@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Pedagogic not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PedagogicResponseDTO> disablePedagogic(@Parameter(description = "Pedagogic ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disablePedagogic(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get pedagogic", description = "Returns pedagogic by ID")
    @ApiResponse(responseCode = "200", description = "Pedagogic found", content = @Content(schema = @Schema(implementation = PedagogicResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Pedagogic\",\"email\":\"pedagogic@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Pedagogic not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PedagogicResponseDTO> getPedagogic(@Parameter(description = "Pedagogic ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findPedagogic(id), HttpStatus.OK);
    }

}
