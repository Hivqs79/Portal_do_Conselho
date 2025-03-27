package net.weg.userapi.service.feedback;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.FeedbackNotFoundException;
import net.weg.userapi.exception.exceptions.UserNotAssociatedException;
import net.weg.userapi.model.dto.request.feedback.FeedbackStudentRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackStudentResponseDTO;
import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.model.entity.feedback.FeedbackStudent;
import net.weg.userapi.model.entity.users.Student;
import net.weg.userapi.repository.FeedbackStudentRepository;
import net.weg.userapi.service.classes.ClassService;
import net.weg.userapi.service.council.CouncilService;
import net.weg.userapi.service.users.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FeedbackStudentService {

    private FeedbackStudentRepository repository;
    private CouncilService councilService;
    private StudentService studentService;
    private ModelMapper modelMapper;

    public Page<FeedbackStudentResponseDTO> findFeedbackStudentSpec(Specification<FeedbackStudent> spec, Pageable pageable) {
        Page<FeedbackStudent> feedbackStudentes = repository.findAll(spec, pageable);
        return feedbackStudentes.map(feedbackStudent -> modelMapper.map(feedbackStudent, FeedbackStudentResponseDTO.class));
    }

    public FeedbackStudentResponseDTO createFeedbackStudent(FeedbackStudentRequestDTO feedbackStudentRequestDTO) {

        if (repository.existsFeedbackStudentByCouncil_IdAndStudent_Id(feedbackStudentRequestDTO.getCouncil_id(), feedbackStudentRequestDTO.getStudent_id())) {
            throw new RuntimeException("Student feedback already exists");
        }

        Council council = councilService.findCouncilEntity(feedbackStudentRequestDTO.getCouncil_id());
        Student student = studentService.findStudentEntity(feedbackStudentRequestDTO.getStudent_id());

        if (!council.getAClass().getStudents().contains(student)) {
            throw new UserNotAssociatedException("The student is not associated with this council");
        }

        FeedbackStudent feedbackStudent = modelMapper.map(feedbackStudentRequestDTO, FeedbackStudent.class);
        feedbackStudent.setCouncil(council); //SETAR CONSELHO
        feedbackStudent.setStudent(student); //SETAR ESTUDANTE

        FeedbackStudent feedbackSaved = repository.save(feedbackStudent);

        return modelMapper.map(feedbackSaved, FeedbackStudentResponseDTO.class);
    }

    public FeedbackStudentResponseDTO findFeedbackStudent(Long id) {
        FeedbackStudent feedbackStudent = findFeedbackEntity(id);

        return modelMapper.map(feedbackStudent, FeedbackStudentResponseDTO.class);
    }

    public FeedbackStudent findFeedbackEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new FeedbackNotFoundException("Class feedback not found"));
    }

    public FeedbackStudentResponseDTO updateFeedbackStudent(FeedbackStudentRequestDTO feedbackStudentRequestDTO, Long id) {

        if (repository.existsFeedbackStudentByCouncil_IdAndStudent_Id(feedbackStudentRequestDTO.getCouncil_id(), feedbackStudentRequestDTO.getStudent_id())
                && !findFeedbackEntity(id).getStudent().equals(studentService.findStudentEntity(feedbackStudentRequestDTO.getStudent_id()))) {
            throw new RuntimeException("Student feedback already exists");
        }

        FeedbackStudent feedbackStudent = findFeedbackEntity(id);
        modelMapper.map(feedbackStudentRequestDTO, feedbackStudent);

        Council council = councilService.findCouncilEntity(feedbackStudentRequestDTO.getCouncil_id());
        Student student = studentService.findStudentEntity(feedbackStudentRequestDTO.getStudent_id());

        if (!council.getAClass().getStudents().contains(student)) {
            throw new UserNotAssociatedException("The student is not associated with this council");
        }

        feedbackStudent.setStudent(student); //SETAR ESTUDANTE

        FeedbackStudent updatedFeedbackStudent = repository.save(feedbackStudent);
        return modelMapper.map(updatedFeedbackStudent, FeedbackStudentResponseDTO.class);
    }

    public FeedbackStudentResponseDTO deleteFeedbackStudent(Long id) {
        FeedbackStudent feedbackStudent = findFeedbackEntity(id);
        FeedbackStudentResponseDTO feedbackStudentResponseDTO = modelMapper.map(feedbackStudent, FeedbackStudentResponseDTO.class);
        repository.delete(feedbackStudent);
        return feedbackStudentResponseDTO;
    }


    public List<FeedbackStudentResponseDTO> getFeedbackStudentByStudentId(Long id) {
        Student student = studentService.findStudentEntity(id);
        List<FeedbackStudentResponseDTO> responseDTOS = new ArrayList<>();
        List<FeedbackStudent> list = repository.findAll();

        list.forEach(feedbackStudent -> {
            if (feedbackStudent.getStudent().equals(student)) {
                responseDTOS.add(modelMapper.map(feedbackStudent, FeedbackStudentResponseDTO.class));
            }
        });

        return responseDTOS;
    }
}
