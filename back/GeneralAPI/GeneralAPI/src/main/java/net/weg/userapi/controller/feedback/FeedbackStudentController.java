package net.weg.userapi.controller.feedback;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.feedback.FeedbackStudentRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackStudentResponseDTO;
import net.weg.userapi.model.entity.feedback.FeedbackStudent;
import net.weg.userapi.service.feedback.FeedbackStudentService;
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
public class FeedbackStudentController {

    private FeedbackStudentService service;

    @GetMapping
    public Page<FeedbackStudentResponseDTO> searchFeedbackStudent(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "rank", spec = Like.class),
                    @Spec(path = "strengths", spec = Like.class),
                    @Spec(path = "toImprove", spec = Like.class),
                    @Spec(path = "council.aClass.name", params = "className", spec = Like.class),
                    @Spec(path = "student.name", params = "studentName", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<FeedbackStudent> spec, Pageable pageable) {

        return service.findFeedbackStudentSpec(spec, pageable);
    }

    @PostMapping
    public ResponseEntity<FeedbackStudentResponseDTO> postFeedbackStudent(@RequestBody @Validated FeedbackStudentRequestDTO feedbackStudentRequestDTO) {
        return new ResponseEntity<>(service.createFeedbackStudent(feedbackStudentRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeedbackStudentResponseDTO> putFeedbackStudent(@RequestBody @Validated FeedbackStudentRequestDTO feedbackStudentRequestDTO, @PathVariable Long id) {
        return new ResponseEntity<>(service.updateFeedbackStudent(feedbackStudentRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<FeedbackStudentResponseDTO> deleteFeedbackStudent(@PathVariable Long id) {
        return new ResponseEntity<>(service.deleteFeedbackStudent(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeedbackStudentResponseDTO> getFeedbackStudent(@PathVariable Long id) {
        return new ResponseEntity<>(service.findFeedbackStudent(id), HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<List<FeedbackStudentResponseDTO>> getAllFeedbackStudentByStudent(@PathVariable Long id) {
        return new ResponseEntity<>(service.getFeedbackStudentByStudentId(id), HttpStatus.OK);
    }

    
}
