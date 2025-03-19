package net.weg.userapi.service.feedback;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.feedback.FeedbackClassRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackClassResponseDTO;
import net.weg.userapi.model.entity.feedback.FeedbackClass;
import net.weg.userapi.repository.FeedbackClassRepository;
import net.weg.userapi.service.ClassService;
import net.weg.userapi.service.council.CouncilService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class FeedbackClassService {

    private FeedbackClassRepository repository;
    private ClassService classService;
    private CouncilService councilService;
    private ModelMapper modelMapper;

    @PostConstruct
    public void configureModelMapper() {
        modelMapper.createTypeMap(FeedbackClass.class, FeedbackClassResponseDTO.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getAClass(), FeedbackClassResponseDTO::setAClass);
                    mapper.map(src -> src.getCouncil(), FeedbackClassResponseDTO::setCouncil);
                });
    }

    public FeedbackClassResponseDTO createFeedbackClass(FeedbackClassRequestDTO feedbackClassRequestDTO) {
        FeedbackClass feedbackClass = modelMapper.map(feedbackClassRequestDTO, FeedbackClass.class);

        feedbackClass.setAClass(classService.findClassEntity(feedbackClassRequestDTO.getClass_id())); //SETAR CLASSE
        feedbackClass.setCouncil(councilService.findCouncilEntity(feedbackClassRequestDTO.getCouncil_id())); //SETAR CONSELHO

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

        feedbackClass.setAClass(classService.findClassEntity(feedbackClassRequestDTO.getClass_id()));

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
