package net.weg.general_api.service.feedback;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.ClassFeedbackAlreadyExistException;
import net.weg.general_api.exception.exceptions.FeedbackNotFoundException;
import net.weg.general_api.model.dto.request.feedback.FeedbackClassRequestDTO;
import net.weg.general_api.model.dto.response.feedback.FeedbackClassResponseDTO;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.feedback.FeedbackClass;
import net.weg.general_api.repository.FeedbackClassRepository;
import net.weg.general_api.service.classes.ClassService;
import net.weg.general_api.service.council.CouncilService;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
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
    private final KafkaEventSender kafkaEventSender;

    public Page<FeedbackClassResponseDTO> findFeedbackClassSpec(Specification<FeedbackClass> spec, Pageable pageable) {
        Page<FeedbackClass> feedbackClasses = repository.getAllByEnabledIsTrue(spec, pageable);
        return feedbackClasses.map(feedbackClass -> modelMapper.map(feedbackClass, FeedbackClassResponseDTO.class));
    }

    public FeedbackClassResponseDTO createFeedbackClass(FeedbackClassRequestDTO feedbackClassRequestDTO) {

        if (repository.existsFeedbackClassByCouncil_Id(feedbackClassRequestDTO.getCouncil_id())) {
            throw new ClassFeedbackAlreadyExistException("Class feedback already exists");
        }

        Council council = councilService.findCouncilEntity(feedbackClassRequestDTO.getCouncil_id());


        FeedbackClass feedbackClass = modelMapper.map(feedbackClassRequestDTO, FeedbackClass.class);
        feedbackClass.setCouncil(council); //SETAR CONSELHO
        council.getAClass().setLastRank(feedbackClass.getRank());

        FeedbackClass feedbackSaved = repository.save(feedbackClass);
        kafkaEventSender.sendEvent(feedbackSaved, "POST", "Feedback Class created");

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
        council.getAClass().setLastRank(feedbackClass.getRank());

        FeedbackClass updatedFeedbackClass = repository.save(feedbackClass);
        kafkaEventSender.sendEvent(updatedFeedbackClass, "PUT", "Feedback Class updated");
        return modelMapper.map(updatedFeedbackClass, FeedbackClassResponseDTO.class);
    }

    public FeedbackClassResponseDTO disableFeedbackClass(Long id) {
        FeedbackClass feedbackClass = findFeedbackEntity(id);
        feedbackClass.setEnabled(false);
        repository.save(feedbackClass);
        kafkaEventSender.sendEvent(feedbackClass, "DELETE", "Feedback Class disabled");
        return modelMapper.map(feedbackClass, FeedbackClassResponseDTO.class);
    }


    public List<FeedbackClassResponseDTO> getFeedbackClassByClassId(Long id) {
        Class aClass = classService.findClassEntity(id);
        List<FeedbackClassResponseDTO> responseDTOS = new ArrayList<>();
        List<FeedbackClass> list = repository.findAll();

        list.forEach(feedbackClass -> {
            if (feedbackClass.getCouncil().getAClass().equals(aClass)) {
                responseDTOS.add(modelMapper.map(feedbackClass, FeedbackClassResponseDTO.class));
            }
        });

        return responseDTOS;
    }

    public FeedbackClassResponseDTO getFeedbackClassByCouncilId(Long id) {
        List<FeedbackClass> feedbackClassList = repository.getFeedbackClassByCouncil_Id(id);
        System.out.println("Lista: " + feedbackClassList);
        FeedbackClass feedbackClass = feedbackClassList.getFirst();
        System.out.println("feedback: " + feedbackClass);
        return modelMapper.map(feedbackClass, FeedbackClassResponseDTO.class);
    }

    public FeedbackClassResponseDTO returnFeedbackClass(Long id) {
        FeedbackClass feedbackClass = findFeedbackEntity(id);
        feedbackClass.setReturned(true);
        repository.save(feedbackClass);
        return modelMapper.map(feedbackClass, FeedbackClassResponseDTO.class);
    }
}
