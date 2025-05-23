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

package net.weg.general_api.controller.feedback;

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
import net.weg.general_api.model.dto.request.feedback.FeedbackStudentRequestDTO;
import net.weg.general_api.model.dto.response.feedback.FeedbackClassResponseDTO;
import net.weg.general_api.model.dto.response.feedback.FeedbackStudentResponseDTO;
import net.weg.general_api.model.entity.feedback.FeedbackStudent;
import net.weg.general_api.service.feedback.FeedbackStudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/feedbacks/student")
@AllArgsConstructor
@Tag(name = "Feedback Student Controller", description = "Controller para gerenciamento de registros dos feedbacks dos alunos")
public class FeedbackStudentController {

    private FeedbackStudentService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search student feedbacks", description = "Returns paginated student feedbacks with filters")
    @ApiResponse(responseCode = "200", description = "Feedbacks found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"rank\":\"CRITICAL\",\"strengths\":\"Excellent performance\",\"toImprove\":\"Could participate more\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"student\":{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"frequency\":0.95,\"isViewed\":true,\"isSatisfied\":true,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<FeedbackStudentResponseDTO> searchFeedbackStudent(
            @And(
                    {
                            @Spec(path = "id", spec = Equal.class),
                            @Spec(path = "rank", spec = Like.class),
                            @Spec(path = "strengths", spec = Like.class),
                            @Spec(path = "toImprove", spec = Like.class),
                            @Spec(path = "isReturned", params = "isReturned", spec = Equal.class),
                            @Spec(path = "council.aClass.name", params = "className", spec = Like.class),
                            @Spec(path = "student.name", params = "studentName", spec = Like.class),
                            @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                            @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                            @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                            @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)})

            Specification<FeedbackStudent> spec, Pageable pageable) {
        return service.findFeedbackStudentSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create student feedback", description = "Creates new student feedback")
    @ApiResponse(responseCode = "200", description = "Feedback created", content = @Content(schema = @Schema(implementation = FeedbackStudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"CRITICAL\",\"strengths\":\"Good progress\",\"toImprove\":\"Needs more focus\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"student\":{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"frequency\":0.85,\"isViewed\":false,\"isSatisfied\":false,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"strengths: must not be blank\",\"toImprove: must not be blank\",\"council_id: must not be null\",\"student_id: must not be null\",\"frequency: must not be null\"]}")))
    @ApiResponse(responseCode = "404", description = "Council or student not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackStudentResponseDTO> postFeedbackStudent(@RequestBody @Validated FeedbackStudentRequestDTO feedbackStudentRequestDTO) {
        return new ResponseEntity<>(service.createFeedbackStudent(feedbackStudentRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update student feedback", description = "Updates existing student feedback")
    @ApiResponse(responseCode = "200", description = "Feedback updated", content = @Content(schema = @Schema(implementation = FeedbackStudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"CRITICAL\",\"strengths\":\"Improved participation\",\"toImprove\":\"Homework delivery\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"student\":{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"frequency\":0.90,\"isViewed\":true,\"isSatisfied\":true,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Feedback, council or student not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackStudentResponseDTO> putFeedbackStudent(@RequestBody @Validated FeedbackStudentRequestDTO feedbackStudentRequestDTO, @Parameter(description = "Feedback ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updateFeedbackStudent(feedbackStudentRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable student feedback", description = "Disables student feedback")
    @ApiResponse(responseCode = "200", description = "Feedback disabled", content = @Content(schema = @Schema(implementation = FeedbackStudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"CRITICAL\",\"strengths\":\"Final evaluation\",\"toImprove\":\"None\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"student\":{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"frequency\":1.0,\"isViewed\":true,\"isSatisfied\":true,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Feedback not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackStudentResponseDTO> disableFeedbackStudent(@Parameter(description = "Feedback ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disableFeedbackStudent(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get student feedback", description = "Returns student feedback by ID")
    @ApiResponse(responseCode = "200", description = "Feedback found", content = @Content(schema = @Schema(implementation = FeedbackStudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"CRITICAL\",\"strengths\":\"Good progress\",\"toImprove\":\"More practice needed\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"student\":{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"frequency\":0.88,\"isViewed\":false,\"isSatisfied\":false,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Feedback not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackStudentResponseDTO> getFeedbackStudent(@Parameter(description = "Feedback ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findFeedbackStudent(id), HttpStatus.OK);
    }

    @GetMapping("/student-id/{studentId}")
    @Operation(method = "GET", summary = "Get student feedback", description = "Returns student feedback by ID")
    @ApiResponse(responseCode = "200", description = "Feedback found", content = @Content(schema = @Schema(implementation = FeedbackStudentResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"CRITICAL\",\"strengths\":\"Good progress\",\"toImprove\":\"More practice needed\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"student\":{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"frequency\":0.88,\"isViewed\":false,\"isSatisfied\":false,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Feedback not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<FeedbackStudentResponseDTO> getFeedbacksOfAStudent(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "rank", spec = Like.class), @Spec(path = "council.aClass.name", params = "className", spec = Like.class), @Spec(path = "strengths", spec = Like.class), @Spec(path = "toImprove", spec = Like.class), @Spec(path = "council.id", params = "councilId", spec = Equal.class), @Spec(path = "council.isFinished", constVal = "true", spec = Equal.class), @Spec(path = "isReturned", params = "isReturned", spec = Equal.class), @Spec(path = "council.aClass.name", params = "className", spec = Like.class), @Spec(path = "student.name", params = "studentName", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<FeedbackStudent> spec, Pageable pageable, @Parameter(description = "Student ID", example = "1") @PathVariable Long studentId) {
        return service.findFeedbackStudentSpecByStudentId(spec, pageable, studentId);
    }

    @GetMapping("/find/{id}")
    @Operation(method = "GET", summary = "Get feedbacks by student", description = "Returns all feedbacks for a specific student")
    @ApiResponse(responseCode = "200", description = "Feedbacks found", content = @Content(schema = @Schema(implementation = List.class), examples = @ExampleObject(value = "[{\"id\":1,\"rank\":\"CRITICAL\",\"strengths\":\"Excellent student\",\"toImprove\":\"None\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"student\":{\"id\":1,\"name\":\"Student\",\"email\":\"student@email.com\",\"isRepresentant\":false,\"lastRank\":\"BRONZE\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"frequency\":0.95,\"isViewed\":true,\"isSatisfied\":true,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}]")))
    @ApiResponse(responseCode = "404", description = "Student not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<List<FeedbackStudentResponseDTO>> getAllFeedbackStudentByStudent(@Parameter(description = "Student ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.getFeedbackStudentByStudentId(id), HttpStatus.OK);
    }

    @PatchMapping("/return/{id}")
    @Operation(method = "PATCH", summary = "Return student feedback status", description = "Modifies isReturned status, false to true")
    @ApiResponse(responseCode = "200", description = "Feedbacks found", content = @Content(schema = @Schema(implementation = List.class), examples = @ExampleObject(value = "[{\"id\":1,\"rank\":\"AVERAGE\",\"strengths\":\"Excellent class\",\"toImprove\":\"None\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}]")))
    @ApiResponse(responseCode = "404", description = "Student not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackStudentResponseDTO> returnFeedbackStudent(@Parameter(description = "Feedback ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.returnFeedbackStudent(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}/satisfied/{iSatisfied}")
    @Operation(method = "PATCH", summary = "Set satisfaction of the student", description = "Set satisfaction of the student in relation with it's feedback")
    @ApiResponse(responseCode = "200", description = "Feedbacks change satisfaction")
    @ApiResponse(responseCode = "404", description = "User not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<Void> changeSatisfactionOfStudent(@Parameter(description = "Feedback ID", example = "1") @PathVariable Long id, @Parameter(description = "Boolean value to student if it's satisfied", example = "1") @PathVariable boolean iSatisfied) {
        service.changeSatisfactionStudent(id, iSatisfied);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/view/{id}")
    @Operation(method = "PATCH", summary = "View student feedback status", description = "Modifies isViewed status, false to true")
    @ApiResponse(responseCode = "200", description = "Feedbacks found", content = @Content(schema = @Schema(implementation = List.class), examples = @ExampleObject(value = "[{\"id\":1,\"rank\":\"AVERAGE\",\"strengths\":\"Excellent class\",\"toImprove\":\"None\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}]")))
    @ApiResponse(responseCode = "404", description = "Student not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackStudentResponseDTO> viewFeedbackStudent(@Parameter(description = "Feedback ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.viewFeedbackStudent(id), HttpStatus.OK);
    }
}
