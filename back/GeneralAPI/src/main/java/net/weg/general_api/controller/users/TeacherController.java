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
import net.weg.general_api.model.dto.request.users.TeacherRequestDTO;
import net.weg.general_api.model.dto.response.classes.ClassResponseDTO;
import net.weg.general_api.model.dto.response.users.TeacherResponseDTO;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.service.users.TeacherService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher")
@AllArgsConstructor
@Tag(name = "Teacher Controller", description = "Controller para gerenciamento dos registros dos professores")
public class TeacherController {

    private TeacherService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search teachers", description = "Returns paginated teachers with filters")
    @ApiResponse(responseCode = "200", description = "Teachers found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<TeacherResponseDTO> searchTeacher(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "name", spec = Like.class), @Spec(path = "email", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<Teacher> spec, Pageable pageable) {
        return service.findTeacherSpec(spec, pageable);
    }

    @GetMapping("/by-class/{id}")
    @Operation(method = "GET", summary = "Search teachers", description = "Returns paginated teachers with filters")
    @ApiResponse(responseCode = "200", description = "Teachers found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<TeacherResponseDTO> searchTeacherByClass(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "name", spec = Like.class), @Spec(path = "email", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<Teacher> spec, Pageable pageable, @PathVariable Long id) {
        return service.findTeacherSpecByClass(spec, id, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create teacher", description = "Creates new teacher")
    @ApiResponse(responseCode = "200", description = "Teacher created", content = @Content(schema = @Schema(implementation = TeacherResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"New Teacher\",\"email\":\"new@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"name: must not be blank\",\"email: must be valid\"]}")))
    @ApiResponse(responseCode = "409", description = "Email exists")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<TeacherResponseDTO> postTeacher(@RequestBody @Validated TeacherRequestDTO teacherRequestDTO) {
        return new ResponseEntity<>(service.createTeacher(teacherRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update teacher", description = "Updates existing teacher")
    @ApiResponse(responseCode = "200", description = "Teacher updated", content = @Content(schema = @Schema(implementation = TeacherResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Updated Teacher\",\"email\":\"updated@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Teacher not found")
    @ApiResponse(responseCode = "409", description = "Email exists")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<TeacherResponseDTO> putTeacher(@RequestBody @Validated TeacherRequestDTO teacherRequestDTO, @Parameter(description = "Teacher ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updateTeacher(teacherRequestDTO, id), HttpStatus.OK);
    }

    @PatchMapping("/add-class/{id}")
    @Operation(method = "PATCH", summary = "Add classes", description = "Adds classes to teacher")
    @ApiResponse(responseCode = "200", description = "Classes added", content = @Content(schema = @Schema(implementation = TeacherResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid class IDs")
    @ApiResponse(responseCode = "404", description = "Teacher/class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<TeacherResponseDTO> addTeacherClasses(@Parameter(description = "Class IDs", example = "[1,2,3]") @RequestBody List<Long> classes_id, @Parameter(description = "Teacher ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.addTeacherClass(id, classes_id), HttpStatus.OK);
    }

    @PatchMapping("/remove-class/{id}")
    @Operation(method = "PATCH", summary = "Remove classes", description = "Removes classes from teacher")
    @ApiResponse(responseCode = "200", description = "Classes removed", content = @Content(schema = @Schema(implementation = TeacherResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-04T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid class IDs")
    @ApiResponse(responseCode = "404", description = "Teacher/class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<TeacherResponseDTO> removeTeacherClasses(@Parameter(description = "Class IDs", example = "[1,2]") @RequestBody List<Long> classes_id, @Parameter(description = "Teacher ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.removeTeacherClass(id, classes_id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable teacher", description = "Disables teacher")
    @ApiResponse(responseCode = "200", description = "Teacher disabled", content = @Content(schema = @Schema(implementation = TeacherResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Disabled Teacher\",\"email\":\"disabled@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-05T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Teacher not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<TeacherResponseDTO> disableTeacher(@Parameter(description = "Teacher ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disableTeacher(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get teacher", description = "Returns teacher by ID")
    @ApiResponse(responseCode = "200", description = "Teacher found", content = @Content(schema = @Schema(implementation = TeacherResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Teacher not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<TeacherResponseDTO> getTeacher(@Parameter(description = "Teacher ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findTeacher(id), HttpStatus.OK);
    }

    @GetMapping("/classes/{id}")
    @Operation(method = "GET", summary = "Get teacher classes", description = "Returns classes by teacher ID")
    @ApiResponse(responseCode = "200", description = "Classes found", content = @Content(schema = @Schema(implementation = List.class), examples = @ExampleObject(value = "[{\"id\":1,\"name\":\"Math\",\"description\":\"Mathematics class\"},{\"id\":2,\"name\":\"Physics\",\"description\":\"Physics class\"}]")))
    @ApiResponse(responseCode = "404", description = "Teacher not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<List<ClassResponseDTO>> getClassesByTeacher(@Parameter(description = "Teacher ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.getClassByTeacher(id), HttpStatus.OK);
    }

}
