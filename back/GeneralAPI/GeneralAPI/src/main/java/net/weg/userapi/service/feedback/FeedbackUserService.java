package net.weg.userapi.service.feedback;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.FeedbackNotFoundException;
import net.weg.userapi.model.dto.request.feedback.FeedbackUserRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackUserResponseDTO;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.model.entity.feedback.FeedbackStudent;
import net.weg.userapi.repository.FeedbackStudentRepository;
import net.weg.userapi.service.council.CouncilService;
import net.weg.userapi.service.users.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FeedbackUserService {

    private FeedbackStudentRepository repository;
    private UserService userService;
    private CouncilService councilService;
    private ModelMapper modelMapper;

    public Page<FeedbackUserResponseDTO> findFeedbackUserSpec(Specification<FeedbackStudent> spec, Pageable pageable) {
        Page<FeedbackStudent> feedbackUsers = repository.findAll(spec, pageable);
        return feedbackUsers.map(feedbackStudent -> modelMapper.map(feedbackStudent, FeedbackUserResponseDTO.class));
    }

    public FeedbackUserResponseDTO createFeedbackUser(FeedbackUserRequestDTO feedbackUserRequestDTO) {

        if (repository.existsFeedbackUserByCouncil_IdAndAndUser_Id(feedbackUserRequestDTO.getCouncil_id(), feedbackUserRequestDTO.getUser_id())) {
            throw new RuntimeException("User feedback already exists");
        }

        FeedbackStudent feedbackStudent = modelMapper.map(feedbackUserRequestDTO, FeedbackStudent.class);

        Council council = councilService.findCouncilEntity(feedbackUserRequestDTO.getCouncil_id());

        feedbackStudent.setUser(userService.findUserEntity(feedbackUserRequestDTO.getUser_id())); //SETAR USUARIO
        feedbackStudent.setCouncil(council); //SETAR CONSELHO

        FeedbackStudent feedbackSaved = repository.save(feedbackStudent);

        return modelMapper.map(feedbackSaved, FeedbackUserResponseDTO.class);
    }

    public FeedbackUserResponseDTO findFeedbackUser(Long id) {
        FeedbackStudent feedbackStudent = findFeedbackEntity(id);

        return modelMapper.map(feedbackStudent, FeedbackUserResponseDTO.class);
    }

    public FeedbackStudent findFeedbackEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new FeedbackNotFoundException("User feedback not found") );
    }

    public FeedbackUserResponseDTO updateFeedbackUser(FeedbackUserRequestDTO feedbackUserRequestDTO, Long id) {
        FeedbackStudent feedbackStudent = findFeedbackEntity(id);
        modelMapper.map(feedbackUserRequestDTO, feedbackStudent);

        feedbackStudent.setUser(userService.findUserEntity(feedbackUserRequestDTO.getUser_id()));

        FeedbackStudent updatedFeedbackStudent = repository.save(feedbackStudent);
        return modelMapper.map(updatedFeedbackStudent, FeedbackUserResponseDTO.class);
    }

    public FeedbackUserResponseDTO deleteFeedbackUser(Long id) {
        FeedbackStudent feedbackStudent = findFeedbackEntity(id);
        FeedbackUserResponseDTO feedbackUserResponseDTO = modelMapper.map(feedbackStudent, FeedbackUserResponseDTO.class);
        repository.delete(feedbackStudent);
        return feedbackUserResponseDTO;
    }

    public List<FeedbackUserResponseDTO> getFeedbackUserByUserId(Long id) {
        return repository.getAllByUser_Id(id).stream().map(feedbackStudent -> modelMapper.map(feedbackStudent, FeedbackUserResponseDTO.class)).collect(Collectors.toList());
    }

    public Page<FeedbackUserResponseDTO> searchFeedbackUserByCouncil(Long id, Pageable pageable) {
        return repository.findAllByCouncil_Id(id, pageable).map(feedbackStudent -> modelMapper.map(feedbackStudent, FeedbackUserResponseDTO.class));
    }

    public FeedbackUserResponseDTO updateFeedbackUserView(Long id) {
        FeedbackStudent feedbackStudent = findFeedbackEntity(id);
        feedbackStudent.setViewed(true);
        return modelMapper.map(repository.save(feedbackStudent), FeedbackUserResponseDTO.class);
    }

    public FeedbackUserResponseDTO updateFeedbackUserSatisfied(Long id, boolean satisfied) {
        FeedbackStudent feedbackStudent = findFeedbackEntity(id);
        feedbackStudent.setSatisfied(satisfied);
        return modelMapper.map(repository.save(feedbackStudent), FeedbackUserResponseDTO.class);
    }
}
