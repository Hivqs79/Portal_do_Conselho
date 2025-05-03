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
import net.weg.general_api.model.dto.request.annotation.AnnotationClassRequestDTO;
import net.weg.general_api.model.dto.response.annotation.AnnotationClassResponseDTO;
import net.weg.general_api.model.entity.annotation.AnnotationClass;
import net.weg.general_api.service.annotations.AnnotationClassService;
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
@Tag(name = "Annotation Class Controller", description = "Controller para gerenciamento de registros das anotações das salas/turmas")
public class AnnotationClassController {

    private AnnotationClassService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search class annotations", description = "Returns paginated class annotations with filters")
    @ApiResponse(responseCode = "200", description = "Annotations found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"rank\":\"GOOD\",\"strengths\":\"Good participation\",\"toImprove\":\"Need more exercises\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<AnnotationClassResponseDTO> searchAnnotationClass(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "teacher.id", params = "teacherId", spec = Equal.class), @Spec(path = "council.isHappening", params = "isHappening", spec = Equal.class), @Spec(path = "council.isFinished", params = "isFinished", spec = Equal.class), @Spec(path = "rank", spec = Like.class), @Spec(path = "strengths", spec = Like.class), @Spec(path = "toImprove", spec = Like.class), @Spec(path = "council.aClass.name", params = "className", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<AnnotationClass> spec, Pageable pageable) {
        return service.findAnnotationClassSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create class annotation", description = "Creates new class annotation")
    @ApiResponse(responseCode = "200", description = "Annotation created", content = @Content(schema = @Schema(implementation = AnnotationClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"GOOD\",\"strengths\":\"Excellent teamwork\",\"toImprove\":\"Time management\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"strengths: must not be blank\",\"toImprove: must not be blank\",\"teacher_id: must not be null\",\"council_id: must not be null\"]}")))
    @ApiResponse(responseCode = "404", description = "Teacher or council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<AnnotationClassResponseDTO> postAnnotationClass(@RequestBody @Validated AnnotationClassRequestDTO annotationClassRequestDTO) {
        return new ResponseEntity<>(service.createAnnotationClass(annotationClassRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update class annotation", description = "Updates existing class annotation")
    @ApiResponse(responseCode = "200", description = "Annotation updated", content = @Content(schema = @Schema(implementation = AnnotationClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"GOOD\",\"strengths\":\"Improved participation\",\"toImprove\":\"Homework delivery\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Annotation, teacher or council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<AnnotationClassResponseDTO> putAnnotationClass(@RequestBody @Validated AnnotationClassRequestDTO annotationClassRequestDTO, @Parameter(description = "Annotation ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updateAnnotationClass(annotationClassRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable class annotation", description = "Disables class annotation")
    @ApiResponse(responseCode = "200", description = "Annotation disabled", content = @Content(schema = @Schema(implementation = AnnotationClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"GOOD\",\"strengths\":\"Final evaluation\",\"toImprove\":\"None\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Annotation not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<AnnotationClassResponseDTO> disableAnnotationClass(@Parameter(description = "Annotation ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disableAnnotationClass(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get class annotation", description = "Returns class annotation by ID")
    @ApiResponse(responseCode = "200", description = "Annotation found", content = @Content(schema = @Schema(implementation = AnnotationClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"GOOD\",\"strengths\":\"Good progress\",\"toImprove\":\"More practice needed\",\"teacher\":{\"id\":1,\"name\":\"Teacher\",\"email\":\"teacher@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Annotation not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<AnnotationClassResponseDTO> getAnnotationClass(@Parameter(description = "Annotation ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findAnnotationClass(id), HttpStatus.OK);
    }
}
