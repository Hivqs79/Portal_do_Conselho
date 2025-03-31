package net.weg.general_api.service.feedback;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.FeedbackNotFoundException;
import net.weg.general_api.exception.exceptions.StudentFeedbackAlreadyExistException;
import net.weg.general_api.exception.exceptions.UserFeedbackAlreadyExistException;
import net.weg.general_api.model.dto.request.feedback.FeedbackUserRequestDTO;
import net.weg.general_api.model.dto.response.feedback.FeedbackUserResponseDTO;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.feedback.FeedbackUser;
import net.weg.general_api.model.entity.users.User;
import net.weg.general_api.repository.FeedbackUserRepository;
import net.weg.general_api.service.council.CouncilService;
import net.weg.general_api.service.kafka.KafkaEventSender;
import net.weg.general_api.service.users.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FeedbackUserService {

    private FeedbackUserRepository repository;
    private CouncilService councilService;
    private UserService userService;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;

    public Page<FeedbackUserResponseDTO> findFeedbackUserSpec(Specification<FeedbackUser> spec, Pageable pageable) {
        Page<FeedbackUser> feedbackUseres = repository.getAllByEnabledIsTrue(spec, pageable);
        return feedbackUseres.map(feedbackUser -> modelMapper.map(feedbackUser, FeedbackUserResponseDTO.class));
    }

    public FeedbackUserResponseDTO createFeedbackUser(FeedbackUserRequestDTO feedbackUserRequestDTO) {

        if (repository.existsFeedbackUserByCouncil_IdAndAndUser_Id(feedbackUserRequestDTO.getCouncil_id(), feedbackUserRequestDTO.getUser_id())) {
            throw new StudentFeedbackAlreadyExistException("Student feedback already exists");
        }

        Council council = councilService.findCouncilEntity(feedbackUserRequestDTO.getCouncil_id());
        User user = userService.findUserEntity(feedbackUserRequestDTO.getUser_id());

        FeedbackUser feedbackUser = modelMapper.map(feedbackUserRequestDTO, FeedbackUser.class);
        feedbackUser.setCouncil(council); //SETAR CONSELHO
        feedbackUser.setUser(user); //SETAR USUARIO

        FeedbackUser feedbackSaved = repository.save(feedbackUser);
        kafkaEventSender.sendEvent(feedbackSaved, "POST", "Feedback User created");

        return modelMapper.map(feedbackSaved, FeedbackUserResponseDTO.class);
    }

    public FeedbackUserResponseDTO findFeedbackUser(Long id) {
        FeedbackUser feedbackUser = findFeedbackEntity(id);

        return modelMapper.map(feedbackUser, FeedbackUserResponseDTO.class);
    }

    public FeedbackUser findFeedbackEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new FeedbackNotFoundException("Class feedback not found"));
    }

    public FeedbackUserResponseDTO updateFeedbackUser(FeedbackUserRequestDTO feedbackUserRequestDTO, Long id) {

        if (repository.existsFeedbackUserByCouncil_IdAndAndUser_Id(feedbackUserRequestDTO.getCouncil_id(), feedbackUserRequestDTO.getUser_id())
                && !findFeedbackEntity(id).getUser().equals(userService.findUserEntity(feedbackUserRequestDTO.getUser_id()))) {
            throw new UserFeedbackAlreadyExistException("User feedback already exists");
        }

        FeedbackUser feedbackUser = findFeedbackEntity(id);
        modelMapper.map(feedbackUserRequestDTO, feedbackUser);

        User user = userService.findUserEntity(feedbackUserRequestDTO.getUser_id());

        feedbackUser.setUser(user); //SETAR USUARIO

        FeedbackUser updatedFeedbackUser = repository.save(feedbackUser);
        kafkaEventSender.sendEvent(updatedFeedbackUser, "PUT", "Feedback User updated");
        return modelMapper.map(updatedFeedbackUser, FeedbackUserResponseDTO.class);
    }

    public FeedbackUserResponseDTO disableFeedbackUser(Long id) {
        FeedbackUser feedbackUser = findFeedbackEntity(id);
        feedbackUser.setEnabled(false);
        repository.save(feedbackUser);
        kafkaEventSender.sendEvent(feedbackUser, "DELETE", "Feedback User disabled");
        return modelMapper.map(feedbackUser, FeedbackUserResponseDTO.class);
    }


    public List<FeedbackUserResponseDTO> getFeedbackUserByStudentId(Long id) {
        User user = userService.findUserEntity(id);
        List<FeedbackUserResponseDTO> responseDTOS = new ArrayList<>();
        List<FeedbackUser> list = repository.findAll();

        list.forEach(feedbackUser -> {
            if (feedbackUser.getUser().equals(user)) {
                responseDTOS.add(modelMapper.map(feedbackUser, FeedbackUserResponseDTO.class));
            }
        });

        return responseDTOS;
    }
}
