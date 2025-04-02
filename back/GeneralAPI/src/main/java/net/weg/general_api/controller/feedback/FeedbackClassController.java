package net.weg.general_api.controller.feedback;

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
import net.weg.general_api.model.dto.request.feedback.FeedbackClassRequestDTO;
import net.weg.general_api.model.dto.response.feedback.FeedbackClassResponseDTO;
import net.weg.general_api.model.entity.feedback.FeedbackClass;
import net.weg.general_api.service.feedback.FeedbackClassService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/feedbacks/class")
@AllArgsConstructor
public class FeedbackClassController {

    private FeedbackClassService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search class feedbacks", description = "Returns paginated class feedbacks with filters")
    @ApiResponse(responseCode = "200", description = "Feedbacks found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"rank\":\"AVERAGE\",\"strengths\":\"Excellent class dynamics\",\"toImprove\":\"Could use more examples\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<FeedbackClassResponseDTO> searchFeedbackClass(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "rank", spec = Like.class), @Spec(path = "strengths", spec = Like.class), @Spec(path = "toImprove", spec = Like.class), @Spec(path = "council.aClass.name", params = "className", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<FeedbackClass> spec, Pageable pageable) {
        return service.findFeedbackClassSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create class feedback", description = "Creates new class feedback")
    @ApiResponse(responseCode = "200", description = "Feedback created", content = @Content(schema = @Schema(implementation = FeedbackClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"AVERAGE\",\"strengths\":\"Good student engagement\",\"toImprove\":\"Need more challenging exercises\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"strengths: must not be blank\",\"toImprove: must not be blank\",\"council_id: must not be null\"]}")))
    @ApiResponse(responseCode = "404", description = "Council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackClassResponseDTO> postFeedbackClass(@RequestBody @Validated FeedbackClassRequestDTO pedagogicRequestDTO) {
        return new ResponseEntity<>(service.createFeedbackClass(pedagogicRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update class feedback", description = "Updates existing class feedback")
    @ApiResponse(responseCode = "200", description = "Feedback updated", content = @Content(schema = @Schema(implementation = FeedbackClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"AVERAGE\",\"strengths\":\"Improved participation\",\"toImprove\":\"Homework delivery\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Feedback or council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackClassResponseDTO> putFeedbackClass(@RequestBody @Validated FeedbackClassRequestDTO pedagogicRequestDTO, @Parameter(description = "Feedback ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updateFeedbackClass(pedagogicRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable class feedback", description = "Disables class feedback")
    @ApiResponse(responseCode = "200", description = "Feedback disabled", content = @Content(schema = @Schema(implementation = FeedbackClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"AVERAGE\",\"strengths\":\"Final evaluation\",\"toImprove\":\"None\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Feedback not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackClassResponseDTO> disableFeedbackClass(@Parameter(description = "Feedback ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disableFeedbackClass(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get class feedback", description = "Returns class feedback by ID")
    @ApiResponse(responseCode = "200", description = "Feedback found", content = @Content(schema = @Schema(implementation = FeedbackClassResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"rank\":\"AVERAGE\",\"strengths\":\"Good progress\",\"toImprove\":\"More practice needed\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Feedback not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackClassResponseDTO> getFeedbackClass(@Parameter(description = "Feedback ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findFeedbackClass(id), HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    @Operation(method = "GET", summary = "Get feedbacks by class", description = "Returns all feedbacks for a specific class")
    @ApiResponse(responseCode = "200", description = "Feedbacks found", content = @Content(schema = @Schema(implementation = List.class), examples = @ExampleObject(value = "[{\"id\":1,\"rank\":\"AVERAGE\",\"strengths\":\"Excellent class\",\"toImprove\":\"None\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}]")))
    @ApiResponse(responseCode = "404", description = "Class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<List<FeedbackClassResponseDTO>> getAllFeedbackClassByClass(@Parameter(description = "Class ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.getFeedbackClassByClassId(id), HttpStatus.OK);
    }

    @PatchMapping("/return/{id}")
    @Operation(method = "PATCH", summary = "Return class feedback status", description = "Modifies isReturned status, false to true")
    @ApiResponse(responseCode = "200", description = "Feedbacks found", content = @Content(schema = @Schema(implementation = List.class), examples = @ExampleObject(value = "[{\"id\":1,\"rank\":\"AVERAGE\",\"strengths\":\"Excellent class\",\"toImprove\":\"None\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}]")))
    @ApiResponse(responseCode = "404", description = "Class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackClassResponseDTO> returnFeedbackClass(@Parameter(description = "Feedback ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.returnFeedbackClass(id), HttpStatus.OK);
    }

}
