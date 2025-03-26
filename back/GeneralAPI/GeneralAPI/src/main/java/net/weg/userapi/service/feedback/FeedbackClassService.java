package net.weg.userapi.service.feedback;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.FeedbackNotFoundException;
import net.weg.userapi.model.dto.request.feedback.FeedbackClassRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackClassResponseDTO;
import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.model.entity.feedback.FeedbackClass;
import net.weg.userapi.repository.FeedbackClassRepository;
import net.weg.userapi.service.classes.ClassService;
import net.weg.userapi.service.council.CouncilService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FeedbackClassService {

    private FeedbackClassRepository repository;
    private ClassService classService;
    private CouncilService councilService;
    private ModelMapper modelMapper;

    public Page<FeedbackClassResponseDTO> findFeedbackClassSpec(Specification<FeedbackClass> spec, Pageable pageable) {
        Page<FeedbackClass> feedbackClasses = repository.findAll(spec, pageable);
        return feedbackClasses.map(feedbackClass -> modelMapper.map(feedbackClass, FeedbackClassResponseDTO.class));
    }

    public FeedbackClassResponseDTO createFeedbackClass(FeedbackClassRequestDTO feedbackClassRequestDTO) {

        if (repository.existsFeedbackClassByCouncil_Id(feedbackClassRequestDTO.getCouncil_id())) {
            throw new RuntimeException("Class feedback already exists");
        }

        FeedbackClass feedbackClass = modelMapper.map(feedbackClassRequestDTO, FeedbackClass.class);

        Council council = councilService.findCouncilEntity(feedbackClassRequestDTO.getCouncil_id());

        feedbackClass.setCouncil(council); //SETAR CONSELHO

        FeedbackClass feedbackSaved = repository.save(feedbackClass);

        return modelMapper.map(feedbackSaved, FeedbackClassResponseDTO.class);
    }

    public FeedbackClassResponseDTO findFeedbackClass(Long id) {
        FeedbackClass feedbackClass = findFeedbackEntity(id);

        return modelMapper.map(feedbackClass, FeedbackClassResponseDTO.class);
    }

    public FeedbackClass findFeedbackEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new FeedbackNotFoundException("Class feedback not found"));
    }

    public FeedbackClassResponseDTO updateFeedbackClass(FeedbackClassRequestDTO feedbackClassRequestDTO, Long id) {
        FeedbackClass feedbackClass = findFeedbackEntity(id);
        modelMapper.map(feedbackClassRequestDTO, feedbackClass);

        Council council = councilService.findCouncilEntity(feedbackClassRequestDTO.getCouncil_id());

        feedbackClass.setCouncil(council); //SETAR CONSELHO

        FeedbackClass updatedFeedbackClass = repository.save(feedbackClass);
        return modelMapper.map(updatedFeedbackClass, FeedbackClassResponseDTO.class);
    }

    public FeedbackClassResponseDTO deleteFeedbackClass(Long id) {
        FeedbackClass feedbackClass = findFeedbackEntity(id);
        FeedbackClassResponseDTO feedbackClassResponseDTO = modelMapper.map(feedbackClass, FeedbackClassResponseDTO.class);
        repository.delete(feedbackClass);
        return feedbackClassResponseDTO;
    }


    public List<FeedbackClassResponseDTO> getFeedbackClassByClassId(Long id) {
        Class aClass = classService.findClassEntity(id);
        List<FeedbackClassResponseDTO> responseDTOS = new ArrayList<>();
        List<FeedbackClass> list = repository.findAll();

        list.forEach(feedbackClass -> {
            if (feedbackClass.getCouncil().getAClass().equals(aClass)){
                responseDTOS.add(modelMapper.map(feedbackClass, FeedbackClassResponseDTO.class));
            }
        });

        return responseDTOS;
    }
}
