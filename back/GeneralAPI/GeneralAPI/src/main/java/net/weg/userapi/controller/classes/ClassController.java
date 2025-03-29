package net.weg.userapi.controller.classes;

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
import net.weg.userapi.model.dto.request.classes.ClassRequestDTO;
import net.weg.userapi.model.dto.response.classes.ClassResponseDTO;
import net.weg.userapi.model.dto.response.users.StudentResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;
import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.service.classes.ClassService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/class")
@AllArgsConstructor
public class ClassController {

    private ClassService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search classes", description = "Returns paginated classes with filters")
    @ApiResponse(responseCode = "200", description = "Classes found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"name\":\"Mathematics\",\"area\":\"EXACT\",\"course\":\"Engineering\",\"lastRank\":\"GOLD\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<ClassResponseDTO> searchClasses(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "name", spec = Like.class), @Spec(path = "area", spec = Like.class), @Spec(path = "course", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<Class> spec, Pageable pageable) {
        return service.findClassSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create class", description = "Creates new class")
    @ApiResponse(responseCode = "200", description = "Class created", content = @Content(schema = @Schema(implementation = ClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"New Class\",\"area\":\"HUMAN\",\"course\":\"Philosophy\",\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"name: must not be blank\",\"area: must not be null\"]}")))
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<ClassResponseDTO> postClass(@RequestBody @Validated ClassRequestDTO classRequestDTO) {
        return new ResponseEntity<>(service.createClass(classRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update class", description = "Updates existing class")
    @ApiResponse(responseCode = "200", description = "Class updated", content = @Content(schema = @Schema(implementation = ClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Updated Class\",\"area\":\"EXACT\",\"course\":\"Computer Science\",\"lastRank\":\"SILVER\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<ClassResponseDTO> putClass(@RequestBody @Validated ClassRequestDTO classRequestDTO, @Parameter(description = "Class ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updateClass(classRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable class", description = "Disables class")
    @ApiResponse(responseCode = "200", description = "Class disabled", content = @Content(schema = @Schema(implementation = ClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Disabled Class\",\"area\":\"HEALTH\",\"course\":\"Medicine\",\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<ClassResponseDTO> disableClass(@Parameter(description = "Class ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disableClass(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get class", description = "Returns class by ID")
    @ApiResponse(responseCode = "200", description = "Class found", content = @Content(schema = @Schema(implementation = ClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Mathematics\",\"area\":\"EXACT\",\"course\":\"Engineering\",\"lastRank\":\"GOLD\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<ClassResponseDTO> getClass(@Parameter(description = "Class ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findClass(id), HttpStatus.OK);
    }

    @GetMapping("/teacher/{id}")
    @Operation(method = "GET", summary = "Get class teachers", description = "Returns teachers by class ID")
    @ApiResponse(responseCode = "200", description = "Teachers found", content = @Content(schema = @Schema(implementation = List.class), examples = @ExampleObject(value = "[{\"id\":1,\"name\":\"Teacher Name\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}]")))
    @ApiResponse(responseCode = "404", description = "Class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<List<TeacherResponseDTO>> getTeachersByClass(@Parameter(description = "Class ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.getTeacherByClass(id), HttpStatus.OK);
    }

    @GetMapping("/student/{id}")
    @Operation(method = "GET", summary = "Get class students", description = "Returns students by class ID")
    @ApiResponse(responseCode = "200", description = "Students found", content = @Content(schema = @Schema(implementation = List.class), examples = @ExampleObject(value = "[{\"id\":1,\"name\":\"Student Name\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}]")))
    @ApiResponse(responseCode = "404", description = "Class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<List<StudentResponseDTO>> getStudentByClass(@Parameter(description = "Class ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.getStudentsByClass(id), HttpStatus.OK);
    }

}





