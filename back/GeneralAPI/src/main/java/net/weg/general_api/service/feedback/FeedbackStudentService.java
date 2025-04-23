package net.weg.general_api.service.feedback;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.FeedbackNotFoundException;
import net.weg.general_api.exception.exceptions.StudentFeedbackAlreadyExistException;
import net.weg.general_api.exception.exceptions.UserNotAssociatedException;
import net.weg.general_api.model.dto.request.feedback.FeedbackStudentRequestDTO;
import net.weg.general_api.model.dto.response.feedback.FeedbackStudentResponseDTO;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.feedback.FeedbackStudent;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.repository.FeedbackStudentRepository;
import net.weg.general_api.service.council.CouncilService;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import net.weg.general_api.service.users.StudentService;
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
    private final KafkaEventSender kafkaEventSender;

    public Page<FeedbackStudentResponseDTO> findFeedbackStudentSpec(Specification<FeedbackStudent> spec, Pageable pageable) {
        Page<FeedbackStudent> feedbackStudents = repository.getAllByEnabledIsTrue(spec, pageable);
        return feedbackStudents.map(feedbackStudent -> modelMapper.map(feedbackStudent, FeedbackStudentResponseDTO.class));
    }

    public Page<FeedbackStudentResponseDTO> findFeedbackStudentSpecByStudentId(Specification<FeedbackStudent> spec, Pageable pageable, Long studentId) {
        Page<FeedbackStudent> feedbackStudents = repository.getAllByEnabledIsTrueAndStudentId(spec, pageable, studentId);
        return feedbackStudents.map(feedbackStudent -> modelMapper.map(feedbackStudent, FeedbackStudentResponseDTO.class));
    }

    public FeedbackStudentResponseDTO createFeedbackStudent(FeedbackStudentRequestDTO feedbackStudentRequestDTO) {

        if (repository.existsFeedbackStudentByCouncil_IdAndStudent_Id(feedbackStudentRequestDTO.getCouncil_id(), feedbackStudentRequestDTO.getStudent_id())) {
            throw new StudentFeedbackAlreadyExistException("Student feedback already exists");
        }

        Council council = councilService.findCouncilEntity(feedbackStudentRequestDTO.getCouncil_id());
        Student student = studentService.findStudentEntity(feedbackStudentRequestDTO.getStudent_id());

        if (!council.getAClass().getStudents().contains(student)) {
            throw new UserNotAssociatedException("The student is not associated with this council");
        }

        FeedbackStudent feedbackStudent = modelMapper.map(feedbackStudentRequestDTO, FeedbackStudent.class);
        feedbackStudent.setCouncil(council); //SETAR CONSELHO
        feedbackStudent.setStudent(student); //SETAR ESTUDANTE
        student.setLastRank(feedbackStudent.getRank());

        student.setLastFrequency(feedbackStudent.getFrequency());
        FeedbackStudent feedbackSaved = repository.save(feedbackStudent);
        kafkaEventSender.sendEvent(feedbackSaved, "POST", "Feedback Student created");

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
            throw new StudentFeedbackAlreadyExistException("Student feedback already exists");
        }

        FeedbackStudent feedbackStudent = findFeedbackEntity(id);
        modelMapper.map(feedbackStudentRequestDTO, feedbackStudent);

        Council council = councilService.findCouncilEntity(feedbackStudentRequestDTO.getCouncil_id());
        Student student = studentService.findStudentEntity(feedbackStudentRequestDTO.getStudent_id());

        if (!council.getAClass().getStudents().contains(student)) {
            throw new UserNotAssociatedException("The student is not associated with this council");
        }

        feedbackStudent.setStudent(student); //SETAR ESTUDANTE
        student.setLastRank(feedbackStudent.getRank());

        student.setLastFrequency(feedbackStudent.getFrequency());
        FeedbackStudent updatedFeedbackStudent = repository.save(feedbackStudent);
        kafkaEventSender.sendEvent(updatedFeedbackStudent, "PUT", "Feedback Student updated");
        return modelMapper.map(updatedFeedbackStudent, FeedbackStudentResponseDTO.class);
    }

    public FeedbackStudentResponseDTO disableFeedbackStudent(Long id) {
        FeedbackStudent feedbackStudent = findFeedbackEntity(id);
        feedbackStudent.setEnabled(false);
        repository.save(feedbackStudent);
        kafkaEventSender.sendEvent(feedbackStudent, "DELETE", "Feedback Student disabled");
        return modelMapper.map(feedbackStudent, FeedbackStudentResponseDTO.class);
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

    public FeedbackStudentResponseDTO returnFeedbackStudent(Long id) {
        FeedbackStudent feedbackStudent = findFeedbackEntity(id);
        feedbackStudent.setReturned(true);
        repository.save(feedbackStudent);
        return modelMapper.map(feedbackStudent, FeedbackStudentResponseDTO.class);
    }

    public void changeSatisfactionStudent(Long id, boolean isSatisfied) {
        FeedbackStudent feedbackStudent = findFeedbackEntity(id);
        feedbackStudent.setSatisfied(isSatisfied);
        repository.save(feedbackStudent);
    }

    public List<FeedbackStudent> getFeedbackStudentsByYearAndClassName(int year, String className) {
        return repository.findByYearEnabledAndClassName(year, className);
    }

    public List<FeedbackStudent> getFeedbackStudentsByYear(int year) {
        return repository.findByYearEnabled(year);
    }

}
