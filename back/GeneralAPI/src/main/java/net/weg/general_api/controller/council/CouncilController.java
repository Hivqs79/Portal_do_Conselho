package net.weg.general_api.controller.council;

import io.swagger.v3.oas.annotations.tags.Tag;
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
import net.weg.general_api.model.dto.request.council.CouncilRequestDTO;
import net.weg.general_api.model.dto.response.council.CouncilResponseDTO;
import net.weg.general_api.model.entity.annotation.Annotation;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.service.council.CouncilService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/council")
@AllArgsConstructor
@Tag(name = "Council Controller", description = "Controller para gerenciamento de registros dos conselhos de classe")
public class CouncilController {

    private CouncilService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search councils", description = "Returns paginated councils with filters")
    @ApiResponse(responseCode = "200", description = "Councils found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"aClass\":{\"id\":1,\"name\":\"Math\",\"area\":\"EXACT\",\"course\":\"Engineering\",\"lastRank\":\"GOLD\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"teachers\":[{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<CouncilResponseDTO> searchCouncil(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "aClass.name", params = "className", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class), @Spec(path = "isHappening", spec = Equal.class)}) Specification<Council> spec, Pageable pageable) {
        return service.findCouncilSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create council", description = "Creates new council")
    @ApiResponse(responseCode = "200", description = "Council created", content = @Content(schema = @Schema(implementation = CouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"aClass\":{\"id\":1,\"name\":\"Math\",\"area\":\"EXACT\",\"course\":\"Engineering\",\"lastRank\":\"GOLD\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"teachers\":[{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"startDateTime: must not be null\",\"class_id: must not be null\"]}")))
    @ApiResponse(responseCode = "404", description = "Class or teacher not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<CouncilResponseDTO> postCouncil(@RequestBody @Validated CouncilRequestDTO councilRequestDTO) {
        return new ResponseEntity<>(service.createCouncil(councilRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update council", description = "Updates existing council")
    @ApiResponse(responseCode = "200", description = "Council updated", content = @Content(schema = @Schema(implementation = CouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"startDateTime\":\"2025-01-01T14:00:00\",\"aClass\":{\"id\":1,\"name\":\"Math\",\"area\":\"EXACT\",\"course\":\"Engineering\",\"lastRank\":\"GOLD\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"teachers\":[{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Council, class or teacher not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<CouncilResponseDTO> putCouncil(@RequestBody @Validated CouncilRequestDTO councilRequestDTO, @Parameter(description = "Council ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updateCouncil(councilRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable council", description = "Disables council")
    @ApiResponse(responseCode = "200", description = "Council disabled", content = @Content(schema = @Schema(implementation = CouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"aClass\":{\"id\":1,\"name\":\"Math\",\"area\":\"EXACT\",\"course\":\"Engineering\",\"lastRank\":\"GOLD\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"teachers\":[{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<CouncilResponseDTO> disableCouncil(@Parameter(description = "Council ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disableCouncil(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get council", description = "Returns council by ID")
    @ApiResponse(responseCode = "200", description = "Council found", content = @Content(schema = @Schema(implementation = CouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"aClass\":{\"id\":1,\"name\":\"Math\",\"area\":\"EXACT\",\"course\":\"Engineering\",\"lastRank\":\"GOLD\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"teachers\":[{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<CouncilResponseDTO> getCouncil(@Parameter(description = "Council ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findCouncil(id), HttpStatus.OK);
    }

    @PatchMapping("/modify/{id}")
    @Operation(method = "PATCH", summary = "Modify council status", description = "Modifies isHappening status, false to true and true to false")
    @ApiResponse(responseCode = "200", description = "Council found", content = @Content(schema = @Schema(implementation = CouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"aClass\":{\"id\":1,\"name\":\"Math\",\"area\":\"EXACT\",\"course\":\"Engineering\",\"lastRank\":\"GOLD\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"teachers\":[{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<CouncilResponseDTO> modifyCouncilStatus(@Parameter(description = "Council ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.modifyCouncilStatus(id), HttpStatus.OK);
    }

    @PatchMapping("/modifyFinished/{id}")
    @Operation(method = "PATCH", summary = "Modify council finished", description = "Modifies isFinished status, false to true and true to false")
    @ApiResponse(responseCode = "200", description = "Council found", content = @Content(schema = @Schema(implementation = CouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"aClass\":{\"id\":1,\"name\":\"Math\",\"area\":\"EXACT\",\"course\":\"Engineering\",\"lastRank\":\"GOLD\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"teachers\":[{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<CouncilResponseDTO> modifyCouncilFinished(@Parameter(description = "Council ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.modifyCouncilFinished(id), HttpStatus.OK);
    }

    @GetMapping("/annotations/{id}")
    @Operation(method = "GET", summary = "Get council annotations", description = "Returns all annotations for a council")
    @ApiResponse(responseCode = "200", description = "Annotations found", content = @Content(schema = @Schema(implementation = List.class), examples = @ExampleObject(value = "[{\"id\":1,\"content\":\"Important discussion point\",\"createdAt\":\"2025-01-01T10:15:00\"}]")))
    @ApiResponse(responseCode = "404", description = "Council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<List<Annotation>> getAllAnnotation(@Parameter(description = "Council ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.getAllAnnotations(id), HttpStatus.OK);
    }
}
