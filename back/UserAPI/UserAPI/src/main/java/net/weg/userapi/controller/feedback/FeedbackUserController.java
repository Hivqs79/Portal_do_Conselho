package net.weg.userapi.controller.feedback;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.feedback.FeedbackUserRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackUserResponseDTO;
import net.weg.userapi.service.feedback.FeedbackUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @PostMapping
    public ResponseEntity<FeedbackUserResponseDTO> postFeedbackUser(@RequestBody @Validated FeedbackUserRequestDTO pedagogicRequestDTO) {
        return new ResponseEntity<>(service.createFeedbackUser(pedagogicRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeedbackUserResponseDTO> putFeedbackUser(@RequestBody @Validated FeedbackUserRequestDTO pedagogicRequestDTO, @PathVariable Integer id) {
        return new ResponseEntity<>(service.updateFeedbackUser(pedagogicRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<FeedbackUserResponseDTO> deleteFeedbackUser(@PathVariable Integer id) {
        return new ResponseEntity<>(service.deleteFeedbackUser(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeedbackUserResponseDTO> getFeedbackUser(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findFeedbackUser(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<FeedbackUserResponseDTO>> getAllFeedbackUser(Pageable pageable) {
        return new ResponseEntity<>(service.pageFeedbackUser(pageable), HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<List<FeedbackUserResponseDTO>> getAllFeedbackUserByUser(@PathVariable Integer id) {
        return new ResponseEntity<>(service.getFeedbackUserByUserId(id), HttpStatus.OK);
    }
    
}
