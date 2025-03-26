package net.weg.userapi.controller.feedback;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.feedback.FeedbackClassRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackClassResponseDTO;
import net.weg.userapi.model.entity.feedback.FeedbackClass;
import net.weg.userapi.service.feedback.FeedbackClassService;
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
    public Page<FeedbackClassResponseDTO> searchFeedbackClass(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "rank", spec = Like.class),
                    @Spec(path = "strengths", spec = Like.class),
                    @Spec(path = "toImprove", spec = Like.class),
                    @Spec(path = "council.aClass.name", params = "className", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<FeedbackClass> spec, Pageable pageable) {

        return service.findFeedbackClassSpec(spec, pageable);
    }

    @PostMapping
    public ResponseEntity<FeedbackClassResponseDTO> postFeedbackClass(@RequestBody @Validated FeedbackClassRequestDTO pedagogicRequestDTO) {
        return new ResponseEntity<>(service.createFeedbackClass(pedagogicRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeedbackClassResponseDTO> putFeedbackClass(@RequestBody @Validated FeedbackClassRequestDTO pedagogicRequestDTO, @PathVariable Long id) {
        return new ResponseEntity<>(service.updateFeedbackClass(pedagogicRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<FeedbackClassResponseDTO> deleteFeedbackClass(@PathVariable Long id) {
        return new ResponseEntity<>(service.deleteFeedbackClass(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeedbackClassResponseDTO> getFeedbackClass(@PathVariable Long id) {
        return new ResponseEntity<>(service.findFeedbackClass(id), HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<List<FeedbackClassResponseDTO>> getAllFeedbackClassByClass(@PathVariable Long id) {
        return new ResponseEntity<>(service.getFeedbackClassByClassId(id), HttpStatus.OK);
    }

    
}
