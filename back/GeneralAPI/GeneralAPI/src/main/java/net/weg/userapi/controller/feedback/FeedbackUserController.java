package net.weg.userapi.controller.feedback;

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
import net.weg.userapi.model.dto.request.feedback.FeedbackUserRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackUserResponseDTO;
import net.weg.userapi.model.entity.feedback.FeedbackUser;
import net.weg.userapi.service.feedback.FeedbackUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/feedbacks/user")
@AllArgsConstructor
public class FeedbackUserController {

    private FeedbackUserService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search user feedbacks", description = "Returns paginated user feedbacks with filters")
    @ApiResponse(responseCode = "200", description = "Feedbacks found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"strengths\":\"Excellent performance\",\"toImprove\":\"Could communicate better\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"user\":{\"id\":1,\"name\":\"User\",\"email\":\"user@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"isViewed\":true,\"isSatisfied\":true,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<FeedbackUserResponseDTO> searchFeedbackUser(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "rank", spec = Like.class), @Spec(path = "strengths", spec = Like.class), @Spec(path = "toImprove", spec = Like.class), @Spec(path = "user.name", params = "userName", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<FeedbackUser> spec, Pageable pageable) {
        return service.findFeedbackUserSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create user feedback", description = "Creates new user feedback")
    @ApiResponse(responseCode = "200", description = "Feedback created", content = @Content(schema = @Schema(implementation = FeedbackUserResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"strengths\":\"Good teamwork\",\"toImprove\":\"Needs more initiative\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"user\":{\"id\":1,\"name\":\"User\",\"email\":\"user@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"isViewed\":false,\"isSatisfied\":false,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"strengths: must not be blank\",\"toImprove: must not be blank\",\"council_id: must not be null\",\"user_id: must not be null\"]}")))
    @ApiResponse(responseCode = "404", description = "Council or user not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackUserResponseDTO> postFeedbackUser(@RequestBody @Validated FeedbackUserRequestDTO feedbackUserRequestDTO) {
        return new ResponseEntity<>(service.createFeedbackUser(feedbackUserRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update user feedback", description = "Updates existing user feedback")
    @ApiResponse(responseCode = "200", description = "Feedback updated", content = @Content(schema = @Schema(implementation = FeedbackUserResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"strengths\":\"Improved communication\",\"toImprove\":\"Should ask more questions\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"user\":{\"id\":1,\"name\":\"User\",\"email\":\"user@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"isViewed\":true,\"isSatisfied\":true,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Feedback, council or user not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackUserResponseDTO> putFeedbackUser(@RequestBody @Validated FeedbackUserRequestDTO feedbackUserRequestDTO, @Parameter(description = "Feedback ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updateFeedbackUser(feedbackUserRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable user feedback", description = "Disables user feedback")
    @ApiResponse(responseCode = "200", description = "Feedback disabled", content = @Content(schema = @Schema(implementation = FeedbackUserResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"strengths\":\"Final evaluation\",\"toImprove\":\"None\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"user\":{\"id\":1,\"name\":\"User\",\"email\":\"user@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"isViewed\":true,\"isSatisfied\":true,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Feedback not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackUserResponseDTO> disableFeedbackUser(@Parameter(description = "Feedback ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disableFeedbackUser(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get user feedback", description = "Returns user feedback by ID")
    @ApiResponse(responseCode = "200", description = "Feedback found", content = @Content(schema = @Schema(implementation = FeedbackUserResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"strengths\":\"Good progress\",\"toImprove\":\"More initiative needed\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"user\":{\"id\":1,\"name\":\"User\",\"email\":\"user@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"isViewed\":false,\"isSatisfied\":false,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Feedback not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackUserResponseDTO> getFeedbackUser(@Parameter(description = "Feedback ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findFeedbackUser(id), HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    @Operation(method = "GET", summary = "Get feedbacks by user", description = "Returns all feedbacks for a specific user")
    @ApiResponse(responseCode = "200", description = "Feedbacks found", content = @Content(schema = @Schema(implementation = List.class), examples = @ExampleObject(value = "[{\"id\":1,\"strengths\":\"Excellent performance\",\"toImprove\":\"None\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"user\":{\"id\":1,\"name\":\"User\",\"email\":\"user@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"isViewed\":true,\"isSatisfied\":true,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}]")))
    @ApiResponse(responseCode = "404", description = "User not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<List<FeedbackUserResponseDTO>> getAllFeedbackUserByStudent(@Parameter(description = "User ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.getFeedbackUserByStudentId(id), HttpStatus.OK);
    }

}
