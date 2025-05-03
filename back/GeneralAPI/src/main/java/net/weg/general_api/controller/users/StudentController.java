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
import net.kaczmarzyk.spring.data.jpa.domain.*;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.general_api.model.dto.request.users.StudentRequestDTO;
import net.weg.general_api.model.dto.response.users.StudentResponseDTO;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.service.users.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@AllArgsConstructor
@Tag(name = "Student Controller", description = "Controller para gerenciamento dos registros dos estudantes")
public class StudentController {

    private StudentService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search students", description = "Returns paginated students with filters")
    @ApiResponse(responseCode = "200", description = "Students found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"EXCELLENT\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<StudentResponseDTO> searchStudent(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "name", spec = Like.class),
                    @Spec(path = "email", spec = Like.class),
                    @Spec(path = "isRepresentant", params = "representant", spec = True.class),
                    @Spec(path = "frequency", spec = Equal.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<Student> spec, Pageable pageable) {
        return service.findStudentSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create student", description = "Creates new student")
    @ApiResponse(responseCode = "200", description = "Student created", content = @Content(schema = @Schema(implementation = StudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"New Student\",\"email\":\"new@email.com\",\"isRepresentant\":false,\"lastRank\":\"EXCELLENT\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"name: must not be blank\",\"email: must be valid\"]}")))
    @ApiResponse(responseCode = "409", description = "Email exists")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<StudentResponseDTO> postStudent(@RequestBody @Validated StudentRequestDTO studentRequestDTO) {
        return new ResponseEntity<>(service.createStudent(studentRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update student", description = "Updates existing student")
    @ApiResponse(responseCode = "200", description = "Student updated", content = @Content(schema = @Schema(implementation = StudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Updated Student\",\"email\":\"updated@email.com\",\"isRepresentant\":true,\"lastRank\":\"EXCELLENT\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Student not found")
    @ApiResponse(responseCode = "409", description = "Email exists")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<StudentResponseDTO> putStudent(@RequestBody @Validated StudentRequestDTO studentRequestDTO, @Parameter(description = "Student ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updateStudent(studentRequestDTO, id), HttpStatus.OK);
    }

    @PatchMapping("/add-class/{id}")
    @Operation(method = "PATCH", summary = "Add classes", description = "Adds classes to student")
    @ApiResponse(responseCode = "200", description = "Classes added", content = @Content(schema = @Schema(implementation = StudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"EXCELLENT\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid class IDs")
    @ApiResponse(responseCode = "404", description = "Student/class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<StudentResponseDTO> addStudentClasses(@Parameter(description = "Class IDs", example = "[1,2,3]") @RequestBody List<Long> classes_id, @Parameter(description = "Student ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.addStudentClass(id, classes_id), HttpStatus.OK);
    }

    @PatchMapping("/remove-class/{id}")
    @Operation(method = "PATCH", summary = "Remove classes", description = "Removes classes from student")
    @ApiResponse(responseCode = "200", description = "Classes removed", content = @Content(schema = @Schema(implementation = StudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"EXCELLENT\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-04T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid class IDs")
    @ApiResponse(responseCode = "404", description = "Student/class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<StudentResponseDTO> removeStudentClasses(@Parameter(description = "Class IDs", example = "[1,2]") @RequestBody List<Long> classes_id, @Parameter(description = "Student ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.removeStudentClass(id, classes_id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable student", description = "Disables student")
    @ApiResponse(responseCode = "200", description = "Student disabled", content = @Content(schema = @Schema(implementation = StudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Disabled Student\",\"email\":\"disabled@email.com\",\"isRepresentant\":false,\"lastRank\":\"EXCELLENT\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-05T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Student not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<StudentResponseDTO> disableStudent(@Parameter(description = "Student ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disableStudent(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get student", description = "Returns student by ID")
    @ApiResponse(responseCode = "200", description = "Student found", content = @Content(schema = @Schema(implementation = StudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":true,\"lastRank\":\"EXCELLENT\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Student not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<StudentResponseDTO> getStudent(@Parameter(description = "Student ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findStudent(id), HttpStatus.OK);
    }

}
