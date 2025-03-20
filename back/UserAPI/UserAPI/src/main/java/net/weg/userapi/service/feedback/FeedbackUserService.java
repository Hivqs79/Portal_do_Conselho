package net.weg.userapi.service.feedback;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.feedback.FeedbackUserRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackUserResponseDTO;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.model.entity.feedback.FeedbackUser;
import net.weg.userapi.model.entity.users.User;
import net.weg.userapi.repository.FeedbackUserRepository;
import net.weg.userapi.service.ClassService;
import net.weg.userapi.service.council.CouncilService;
import net.weg.userapi.service.users.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FeedbackUserService {

    private FeedbackUserRepository repository;
    private UserService userService;
    private CouncilService councilService;
    private ModelMapper modelMapper;

    public FeedbackUserResponseDTO createFeedbackUser(FeedbackUserRequestDTO feedbackUserRequestDTO) {
        FeedbackUser feedbackUser = modelMapper.map(feedbackUserRequestDTO, FeedbackUser.class);

        Council council = councilService.findCouncilEntity(feedbackUserRequestDTO.getCouncil_id());

        feedbackUser.setUser(userService.findUserEntity(feedbackUserRequestDTO.getUser_id())); //SETAR USUARIO
        feedbackUser.setCouncil(council); //SETAR CONSELHO

        FeedbackUser feedbackSaved = repository.save(feedbackUser);

        return modelMapper.map(feedbackSaved, FeedbackUserResponseDTO.class);
    }

    public FeedbackUserResponseDTO findFeedbackUser(Integer id) {
        FeedbackUser feedbackUser = findFeedbackEntity(id);

        return modelMapper.map(feedbackUser, FeedbackUserResponseDTO.class);
    }

    public FeedbackUser findFeedbackEntity(Integer id) {
        return repository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Page<FeedbackUserResponseDTO> pageFeedbackUser(Pageable pageable) {
        Page<FeedbackUser> feedbackUser = repository.findAll(pageable);

        return feedbackUser.map(feedback -> modelMapper.map(feedback, FeedbackUserResponseDTO.class));
    }

    public FeedbackUserResponseDTO updateFeedbackUser(FeedbackUserRequestDTO feedbackUserRequestDTO, Integer id) {
        FeedbackUser feedbackUser = findFeedbackEntity(id);
        modelMapper.map(feedbackUserRequestDTO, feedbackUser);

        feedbackUser.setUser(userService.findUserEntity(feedbackUserRequestDTO.getUser_id()));

        FeedbackUser updatedFeedbackUser = repository.save(feedbackUser);
        return modelMapper.map(updatedFeedbackUser, FeedbackUserResponseDTO.class);
    }

    public FeedbackUserResponseDTO deleteFeedbackUser(Integer id) {
        FeedbackUser feedbackUser = findFeedbackEntity(id);
        FeedbackUserResponseDTO feedbackUserResponseDTO = modelMapper.map(feedbackUser, FeedbackUserResponseDTO.class);
        repository.delete(feedbackUser);
        return feedbackUserResponseDTO;
    }

    public List<FeedbackUserResponseDTO> getFeedbackUserByUserId(Integer id) {
        return repository.getAllByUser_Id(id).stream().map(feedbackUser -> modelMapper.map(feedbackUser, FeedbackUserResponseDTO.class)).collect(Collectors.toList());
    }
}
