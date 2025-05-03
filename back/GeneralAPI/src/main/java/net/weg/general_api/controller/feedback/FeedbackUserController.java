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
import net.weg.general_api.model.dto.request.feedback.FeedbackUserRequestDTO;
import net.weg.general_api.model.dto.response.feedback.FeedbackClassResponseDTO;
import net.weg.general_api.model.dto.response.feedback.FeedbackUserResponseDTO;
import net.weg.general_api.model.entity.feedback.FeedbackUser;
import net.weg.general_api.service.feedback.FeedbackUserService;
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
@Tag(name = "Feedback User Controller", description = "Controller para gerenciamento de registros dos feedbacks dos usuários gerais (supervisor e etc...)")
public class FeedbackUserController {

    private FeedbackUserService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search user feedbacks", description = "Returns paginated user feedbacks with filters")
    @ApiResponse(responseCode = "200", description = "Feedbacks found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"strengths\":\"Excellent performance\",\"toImprove\":\"Could communicate better\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"user\":{\"id\":1,\"name\":\"User\",\"email\":\"user@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"isViewed\":true,\"isSatisfied\":true,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<FeedbackUserResponseDTO> searchFeedbackUser(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "preCouncil.id", params = "preCouncilId", spec = Equal.class), @Spec(path = "strengths", spec = Like.class), @Spec(path = "isReturned", params = "isReturned", spec = Equal.class), @Spec(path = "toImprove", spec = Like.class), @Spec(path = "user.name", params = "userName", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<FeedbackUser> spec, Pageable pageable) {
        return service.findFeedbackUserSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create user feedback", description = "Creates new user feedback")
    @ApiResponse(responseCode = "200", description = "Feedback created", content = @Content(schema = @Schema(implementation = FeedbackUserResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"strengths\":\"Good teamwork\",\"toImprove\":\"Needs more initiative\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"user\":{\"id\":1,\"name\":\"User\",\"email\":\"user@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"isViewed\":false,\"isSatisfied\":false,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"strengths: must not be blank\",\"toImprove: must not be blank\",\"council_id: must not be null\",\"user_id: must not be null\"]}")))
    @ApiResponse(responseCode = "404", description = "Pre-council or user not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FeedbackUserResponseDTO> postFeedbackUser(@RequestBody @Validated FeedbackUserRequestDTO feedbackUserRequestDTO) {
        return new ResponseEntity<>(service.createFeedbackUser(feedbackUserRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update user feedback", description = "Updates existing user feedback")
    @ApiResponse(responseCode = "200", description = "Feedback updated", content = @Content(schema = @Schema(implementation = FeedbackUserResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"strengths\":\"Improved communication\",\"toImprove\":\"Should ask more questions\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"user\":{\"id\":1,\"name\":\"User\",\"email\":\"user@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"isViewed\":true,\"isSatisfied\":true,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Feedback, pre-council or user not found")
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

    @GetMapping("/user-id/{userId}")
    @Operation(method = "GET", summary = "Get feedbacks by user", description = "Returns all feedbacks for a specific user")
    @ApiResponse(responseCode = "200", description = "Feedbacks found", content = @Content(schema = @Schema(implementation = List.class), examples = @ExampleObject(value = "[{\"id\":1,\"strengths\":\"Excellent performance\",\"toImprove\":\"None\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"user\":{\"id\":1,\"name\":\"User\",\"email\":\"user@email.com\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"isViewed\":true,\"isSatisfied\":true,\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}]")))
    @ApiResponse(responseCode = "404", description = "User not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<FeedbackUserResponseDTO> getAllFeedbackUserByStudent(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "preCouncil.id", params = "preCouncilId", spec = Equal.class), @Spec(path = "preCouncil.aClass.name", params = "className", spec = Like.class), @Spec(path = "strengths", spec = Like.class), @Spec(path = "isReturned", params = "isReturned", spec = Equal.class), @Spec(path = "toImprove", spec = Like.class), @Spec(path = "user.name", params = "userName", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<FeedbackUser> spec, Pageable pageable, @Parameter(description = "User ID", example = "1") @PathVariable Long userId) {
        return service.findFeedbackUserSpecByUserId(spec, pageable, userId);
    }

    @PatchMapping("/return/{id}")
    @Operation(method = "PATCH", summary = "Return user feedback status", description = "Modifies isReturned status, false to true")
    @ApiResponse(responseCode = "200", description = "Feedback returned", content = @Content(schema = @Schema(implementation = List.class), examples = @ExampleObject(value = "[{\"id\":1,\"rank\":\"AVERAGE\",\"strengths\":\"Excellent class\",\"toImprove\":\"None\",\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}]")))
    @ApiResponse(responseCode = "404", description = "User not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<Void> returnUserStudent(@Parameter(description = "Feedback ID", example = "1") @PathVariable Long id) {
        service.returnFeedbackUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{id}/satisfied/{iSatisfied}")
    @Operation(method = "PATCH", summary = "Set satisfaction of the user", description = "Set satisfaction of the user in relation with it's feedback")
    @ApiResponse(responseCode = "200", description = "Feedbacks change satisfaction")
    @ApiResponse(responseCode = "404", description = "User not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<Void> changeSatisfactionOfUser(@Parameter(description = "Feedback ID", example = "1") @PathVariable Long id, @Parameter(description = "Boolean value to user if it's satisfied", example = "1") @PathVariable boolean iSatisfied) {
        service.changeSatisfactionUser(id, iSatisfied);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
