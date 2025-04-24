package net.weg.general_api.controller.annotations;

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
import net.weg.general_api.exception.exceptions.UserNotAssociatedException;
import net.weg.general_api.model.dto.request.annotation.AnnotationStudentRequestDTO;
import net.weg.general_api.model.dto.response.annotation.AnnotationStudentResponseDTO;
import net.weg.general_api.model.entity.annotation.AnnotationStudent;
import net.weg.general_api.service.annotations.AnnotationStudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/annotations/student")
@AllArgsConstructor
@Tag(name = "Annotation Student Controller", description = "Controller para gerenciamento de registros das anotações dos alunos")
public class AnnotationStudentController {

    private AnnotationStudentService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search student annotations", description = "Returns paginated student annotations with filters")
    @ApiResponse(responseCode = "200", description = "Annotations found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"rank\":\"EXCELLENT\",\"strengths\":\"Excellent participation\",\"toImprove\":\"Could improve homework\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"student\":{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<AnnotationStudentResponseDTO> searchAnnotationStudent(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "rank", spec = Like.class), @Spec(path = "strengths", spec = Like.class), @Spec(path = "toImprove", spec = Like.class), @Spec(path = "council.id", spec = Equal.class, params = "councilId"), @Spec(path = "teacher.id", params = "teacherId", spec = Equal.class), @Spec(path = "student.name", params = "studentName", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<AnnotationStudent> spec, Pageable pageable) {
        return service.findAnnotationStudentSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create student annotation", description = "Creates new student annotation")
    @ApiResponse(responseCode = "200", description = "Annotation created", content = @Content(schema = @Schema(implementation = AnnotationStudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"EXCELLENT\",\"strengths\":\"Good progress\",\"toImprove\":\"Needs more focus\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"student\":{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"strengths: must not be blank\",\"toImprove: must not be blank\",\"teacher_id: must not be null\",\"council_id: must not be null\",\"student_id: must not be null\"]}")))
    @ApiResponse(responseCode = "404", description = "Teacher, student or council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<AnnotationStudentResponseDTO> postAnnotationStudent(@RequestBody @Validated AnnotationStudentRequestDTO annotationStudentRequestDTO) {
        return new ResponseEntity<>(service.createAnnotationStudent(annotationStudentRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update student annotation", description = "Updates existing student annotation")
    @ApiResponse(responseCode = "200", description = "Annotation updated", content = @Content(schema = @Schema(implementation = AnnotationStudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"EXCELLENT\",\"strengths\":\"Improved participation\",\"toImprove\":\"Homework delivery\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"student\":{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Annotation, teacher, student or council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<AnnotationStudentResponseDTO> putAnnotationStudent(@RequestBody @Validated AnnotationStudentRequestDTO annotationStudentRequestDTO, @Parameter(description = "Annotation ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updateAnnotationStudent(annotationStudentRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable student annotation", description = "Disables student annotation")
    @ApiResponse(responseCode = "200", description = "Annotation disabled", content = @Content(schema = @Schema(implementation = AnnotationStudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"EXCELLENT\",\"strengths\":\"Final evaluation\",\"toImprove\":\"None\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"student\":{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Annotation not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<AnnotationStudentResponseDTO> disableAnnotationStudent(@Parameter(description = "Annotation ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disableAnnotationStudent(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get student annotation", description = "Returns student annotation by ID")
    @ApiResponse(responseCode = "200", description = "Annotation found", content = @Content(schema = @Schema(implementation = AnnotationStudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"EXCELLENT\",\"strengths\":\"Good progress\",\"toImprove\":\"More practice needed\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"student\":{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Annotation not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<AnnotationStudentResponseDTO> getAnnotationStudent(@Parameter(description = "Annotation ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findAnnotationStudent(id), HttpStatus.OK);
    }

    @GetMapping("/by/{id}")
    @Operation(method = "GET", summary = "Get annotations by student", description = "Returns paginated annotations for a specific student")
    @ApiResponse(responseCode = "200", description = "Annotations found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"rank\":\"EXCELLENT\",\"strengths\":\"Excellent work\",\"toImprove\":\"None\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "404", description = "Student not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<Page<AnnotationStudentResponseDTO>> getAnnotationByOneStudent(@Parameter(description = "Student ID", example = "1") @PathVariable Long id, Pageable pageable) {
        return new ResponseEntity<>(service.pageAnnotationsByStudent(id, pageable), HttpStatus.OK);
    }
    
}
