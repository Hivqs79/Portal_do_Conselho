package net.weg.userapi.controller.annotations;

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
import net.weg.userapi.model.dto.request.annotation.AnnotationClassRequestDTO;
import net.weg.userapi.model.dto.response.annotation.AnnotationClassResponseDTO;
import net.weg.userapi.model.entity.annotation.AnnotationClass;
import net.weg.userapi.service.annotations.AnnotationClassService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/annotations/class")
@AllArgsConstructor
public class AnnotationClassController {

    private AnnotationClassService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search class annotations", description = "Returns paginated class annotations with filters")
    @ApiResponse(responseCode = "200", description = "Annotations found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"rank\":\"GOLD\",\"strengths\":\"Good participation\",\"toImprove\":\"Need more exercises\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<AnnotationClassResponseDTO> searchAnnotationClass(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "rank", spec = Like.class), @Spec(path = "strengths", spec = Like.class), @Spec(path = "toImprove", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<AnnotationClass> spec, Pageable pageable) {
        return service.findAnnotationClassSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create class annotation", description = "Creates new class annotation")
    @ApiResponse(responseCode = "200", description = "Annotation created", content = @Content(schema = @Schema(implementation = AnnotationClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"SILVER\",\"strengths\":\"Excellent teamwork\",\"toImprove\":\"Time management\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"strengths: must not be blank\",\"toImprove: must not be blank\",\"teacher_id: must not be null\",\"council_id: must not be null\"]}")))
    @ApiResponse(responseCode = "404", description = "Teacher or council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<AnnotationClassResponseDTO> postAnnotationClass(@RequestBody @Validated AnnotationClassRequestDTO pedagogicRequestDTO) {
        return new ResponseEntity<>(service.createAnnotationClass(pedagogicRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update class annotation", description = "Updates existing class annotation")
    @ApiResponse(responseCode = "200", description = "Annotation updated", content = @Content(schema = @Schema(implementation = AnnotationClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"BRONZE\",\"strengths\":\"Improved participation\",\"toImprove\":\"Homework delivery\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Annotation, teacher or council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<AnnotationClassResponseDTO> putAnnotationClass(@RequestBody @Validated AnnotationClassRequestDTO pedagogicRequestDTO, @Parameter(description = "Annotation ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updateAnnotationClass(pedagogicRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable class annotation", description = "Disables class annotation")
    @ApiResponse(responseCode = "200", description = "Annotation disabled", content = @Content(schema = @Schema(implementation = AnnotationClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"GOLD\",\"strengths\":\"Final evaluation\",\"toImprove\":\"None\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Annotation not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<AnnotationClassResponseDTO> disableAnnotationClass(@Parameter(description = "Annotation ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disableAnnotationClass(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get class annotation", description = "Returns class annotation by ID")
    @ApiResponse(responseCode = "200", description = "Annotation found", content = @Content(schema = @Schema(implementation = AnnotationClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"SILVER\",\"strengths\":\"Good progress\",\"toImprove\":\"More practice needed\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Annotation not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<AnnotationClassResponseDTO> getAnnotationClass(@Parameter(description = "Annotation ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findAnnotationClass(id), HttpStatus.OK);
    }

}
