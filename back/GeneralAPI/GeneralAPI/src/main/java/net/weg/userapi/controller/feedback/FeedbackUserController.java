package net.weg.userapi.controller.feedback;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.feedback.FeedbackUserRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackUserResponseDTO;
import net.weg.userapi.model.entity.feedback.FeedbackStudent;
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
    public Page<FeedbackUserResponseDTO> searchFeedbackUser(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "rank", spec = Like.class),
                    @Spec(path = "strengths", spec = Like.class),
                    @Spec(path = "toImprove", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<FeedbackStudent> spec, Pageable pageable) {

        return service.findFeedbackUserSpec(spec, pageable);
    }

    @GetMapping("/council/{id}")
    public ResponseEntity<Page<FeedbackUserResponseDTO>> searchFeedbackUserByCouncil(@PathVariable Long id, Pageable pageable) {
        return new ResponseEntity<>(service.searchFeedbackUserByCouncil(id, pageable), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<FeedbackUserResponseDTO> postFeedbackUser(@RequestBody @Validated FeedbackUserRequestDTO feedbackUserRequestDTO) {
        return new ResponseEntity<>(service.createFeedbackUser(feedbackUserRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeedbackUserResponseDTO> putFeedbackUser(@RequestBody @Validated FeedbackUserRequestDTO feedbackUserRequestDTO, @PathVariable Long id) {
        return new ResponseEntity<>(service.updateFeedbackUser(feedbackUserRequestDTO, id), HttpStatus.OK);
    }

    @PatchMapping("/{id}/view")
    public ResponseEntity<FeedbackUserResponseDTO> patchFeedbackUserView(@PathVariable Long id) {
        return new ResponseEntity<>(service.updateFeedbackUserView(id), HttpStatus.OK);
    }

    @PatchMapping("/{id}/satisfied/{satisfied}")
    public ResponseEntity<FeedbackUserResponseDTO> patchFeedbackUserSatisfied(@PathVariable Long id, @PathVariable(name = "satisfied") boolean satisfied) {
        return new ResponseEntity<>(service.updateFeedbackUserSatisfied(id, satisfied), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<FeedbackUserResponseDTO> deleteFeedbackUser(@PathVariable Long id) {
        return new ResponseEntity<>(service.deleteFeedbackUser(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeedbackUserResponseDTO> getFeedbackUser(@PathVariable Long id) {
        return new ResponseEntity<>(service.findFeedbackUser(id), HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<List<FeedbackUserResponseDTO>> getAllFeedbackUserByUser(@PathVariable Long id) {
        return new ResponseEntity<>(service.getFeedbackUserByUserId(id), HttpStatus.OK);
    }

}
