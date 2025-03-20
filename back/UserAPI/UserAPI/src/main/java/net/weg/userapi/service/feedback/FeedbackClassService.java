package net.weg.userapi.service.feedback;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.feedback.FeedbackClassRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackClassResponseDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackUserResponseDTO;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.model.entity.feedback.FeedbackClass;
import net.weg.userapi.repository.FeedbackClassRepository;
import net.weg.userapi.service.ClassService;
import net.weg.userapi.service.council.CouncilService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FeedbackClassService {

    private FeedbackClassRepository repository;
    private ClassService classService;
    private CouncilService councilService;
    private ModelMapper modelMapper;

    public FeedbackClassResponseDTO createFeedbackClass(FeedbackClassRequestDTO feedbackClassRequestDTO) {
        FeedbackClass feedbackClass = modelMapper.map(feedbackClassRequestDTO, FeedbackClass.class);

        Council council = councilService.findCouncilEntity(feedbackClassRequestDTO.getCouncil_id());

        feedbackClass.setCouncil(council); //SETAR CONSELHO

        FeedbackClass feedbackSaved = repository.save(feedbackClass);

        return modelMapper.map(feedbackSaved, FeedbackClassResponseDTO.class);
    }

    public FeedbackClassResponseDTO findFeedbackClass(Integer id) {
        FeedbackClass feedbackClass = findFeedbackEntity(id);

        return modelMapper.map(feedbackClass, FeedbackClassResponseDTO.class);
    }

    public FeedbackClass findFeedbackEntity(Integer id) {
        return repository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Page<FeedbackClassResponseDTO> pageFeedbackClass(Pageable pageable) {
        Page<FeedbackClass> feedbackClass = repository.findAll(pageable);

        return feedbackClass.map(feedback -> modelMapper.map(feedback, FeedbackClassResponseDTO.class));
    }

    public FeedbackClassResponseDTO updateFeedbackClass(FeedbackClassRequestDTO feedbackClassRequestDTO, Integer id) {
        FeedbackClass feedbackClass = findFeedbackEntity(id);
        modelMapper.map(feedbackClassRequestDTO, feedbackClass);

        Council council = councilService.findCouncilEntity(feedbackClassRequestDTO.getCouncil_id());

        feedbackClass.setCouncil(council); //SETAR CONSELHO

        FeedbackClass updatedFeedbackClass = repository.save(feedbackClass);
        return modelMapper.map(updatedFeedbackClass, FeedbackClassResponseDTO.class);
    }

    public FeedbackClassResponseDTO deleteFeedbackClass(Integer id) {
        FeedbackClass feedbackClass = findFeedbackEntity(id);
        FeedbackClassResponseDTO feedbackClassResponseDTO = modelMapper.map(feedbackClass, FeedbackClassResponseDTO.class);
        repository.delete(feedbackClass);
        return feedbackClassResponseDTO;
    }


}
