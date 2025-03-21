package net.weg.userapi.controller.feedback;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.feedback.FeedbackClassRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackClassResponseDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackUserResponseDTO;
import net.weg.userapi.service.feedback.FeedbackClassService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @PostMapping
    public ResponseEntity<FeedbackClassResponseDTO> postFeedbackClass(@RequestBody @Validated FeedbackClassRequestDTO pedagogicRequestDTO) {
        return new ResponseEntity<>(service.createFeedbackClass(pedagogicRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeedbackClassResponseDTO> putFeedbackClass(@RequestBody @Validated FeedbackClassRequestDTO pedagogicRequestDTO, @PathVariable Integer id) {
        return new ResponseEntity<>(service.updateFeedbackClass(pedagogicRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<FeedbackClassResponseDTO> deleteFeedbackClass(@PathVariable Integer id) {
        return new ResponseEntity<>(service.deleteFeedbackClass(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeedbackClassResponseDTO> getFeedbackClass(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findFeedbackClass(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<FeedbackClassResponseDTO>> getAllFeedbackClass(Pageable pageable) {
        return new ResponseEntity<>(service.pageFeedbackClass(pageable), HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<List<FeedbackClassResponseDTO>> getAllFeedbackClassByClass(@PathVariable Integer id) {
        return new ResponseEntity<>(service.getFeedbackClassByClassId(id), HttpStatus.OK);
    }

    
}
