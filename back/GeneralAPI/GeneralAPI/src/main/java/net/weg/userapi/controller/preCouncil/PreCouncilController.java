package net.weg.userapi.controller.preCouncil;

import lombok.AllArgsConstructor;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.preCouncil.PreCouncilRequestDTO;
import net.weg.userapi.model.dto.response.preCouncil.PreCouncilResponseDTO;
import net.weg.userapi.model.entity.preCouncil.PreCouncil;
import net.weg.userapi.service.preCouncil.PreCouncilService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pre-council")
@AllArgsConstructor
public class PreCouncilController {

    private PreCouncilService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search pre-councils", description = "Returns paginated pre-councils with filters")
    @ApiResponse(responseCode = "200", description = "Pre-councils found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<PreCouncilResponseDTO> searchPreCouncil(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "council.aClass.name", params = "councilClassName", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<PreCouncil> spec, Pageable pageable) {
        return service.findPreCouncilSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create pre-council", description = "Creates new pre-council")
    @ApiResponse(responseCode = "200", description = "Pre-council created", content = @Content(schema = @Schema(implementation = PreCouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"council_id: must not be null\"]}")))
    @ApiResponse(responseCode = "404", description = "Council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilResponseDTO> postPreCouncil(@RequestBody @Validated PreCouncilRequestDTO preCouncilRequestDTO) {
        return new ResponseEntity<>(service.createPreCouncil(preCouncilRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update pre-council", description = "Updates existing pre-council")
    @ApiResponse(responseCode = "200", description = "Pre-council updated", content = @Content(schema = @Schema(implementation = PreCouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Pre-council or council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilResponseDTO> putPreCouncil(@RequestBody @Validated PreCouncilRequestDTO preCouncilRequestDTO, @Parameter(description = "Pre-council ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updatePreCouncil(preCouncilRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable pre-council", description = "Disables pre-council")
    @ApiResponse(responseCode = "200", description = "Pre-council disabled", content = @Content(schema = @Schema(implementation = PreCouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Pre-council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilResponseDTO> disablePreCouncil(@Parameter(description = "Pre-council ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disablePreCouncil(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get pre-council", description = "Returns pre-council by ID")
    @ApiResponse(responseCode = "200", description = "Pre-council found", content = @Content(schema = @Schema(implementation = PreCouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Pre-council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilResponseDTO> getPreCouncil(@Parameter(description = "Pre-council ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findPreCouncil(id), HttpStatus.OK);
    }
    
}
