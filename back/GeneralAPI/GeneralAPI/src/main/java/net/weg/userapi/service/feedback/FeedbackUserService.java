package net.weg.userapi.service.feedback;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.FeedbackNotFoundException;
import net.weg.userapi.model.dto.request.feedback.FeedbackUserRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackUserResponseDTO;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.model.entity.feedback.FeedbackUser;
import net.weg.userapi.model.entity.users.User;
import net.weg.userapi.repository.FeedbackUserRepository;
import net.weg.userapi.service.council.CouncilService;
import net.weg.userapi.service.users.UserService;
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

    public Page<FeedbackUserResponseDTO> findFeedbackUserSpec(Specification<FeedbackUser> spec, Pageable pageable) {
        Page<FeedbackUser> feedbackUseres = repository.findAll(spec, pageable);
        return feedbackUseres.map(feedbackUser -> modelMapper.map(feedbackUser, FeedbackUserResponseDTO.class));
    }

    public FeedbackUserResponseDTO createFeedbackUser(FeedbackUserRequestDTO feedbackUserRequestDTO) {

        if (repository.existsFeedbackUserByCouncil_IdAndAndUser_Id(feedbackUserRequestDTO.getCouncil_id(), feedbackUserRequestDTO.getUser_id())) {
            throw new RuntimeException("Student feedback already exists");
        }

        Council council = councilService.findCouncilEntity(feedbackUserRequestDTO.getCouncil_id());
        User user = userService.findUserEntity(feedbackUserRequestDTO.getUser_id());

        FeedbackUser feedbackUser = modelMapper.map(feedbackUserRequestDTO, FeedbackUser.class);
        feedbackUser.setCouncil(council); //SETAR CONSELHO
        feedbackUser.setUser(user); //SETAR USUARIO

        FeedbackUser feedbackSaved = repository.save(feedbackUser);

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
            throw new RuntimeException("User feedback already exists");
        }

        FeedbackUser feedbackUser = findFeedbackEntity(id);
        modelMapper.map(feedbackUserRequestDTO, feedbackUser);

        User user = userService.findUserEntity(feedbackUserRequestDTO.getUser_id());

        feedbackUser.setUser(user); //SETAR USUARIO

        FeedbackUser updatedFeedbackUser = repository.save(feedbackUser);
        return modelMapper.map(updatedFeedbackUser, FeedbackUserResponseDTO.class);
    }

    public FeedbackUserResponseDTO disableFeedbackUser(Long id) {
        FeedbackUser feedbackUser = findFeedbackEntity(id);
        feedbackUser.setEnabled(false);
        repository.save(feedbackUser);
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
