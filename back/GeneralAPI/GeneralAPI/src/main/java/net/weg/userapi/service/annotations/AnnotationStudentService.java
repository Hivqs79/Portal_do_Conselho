package net.weg.userapi.service.annotations;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.AnnotationNotFoundException;
import net.weg.userapi.exception.exceptions.UserNotAssociatedException;
import net.weg.userapi.model.dto.request.annotation.AnnotationStudentRequestDTO;
import net.weg.userapi.model.dto.response.annotation.AnnotationClassResponseDTO;
import net.weg.userapi.model.dto.response.annotation.AnnotationStudentResponseDTO;
import net.weg.userapi.model.entity.annotation.AnnotationClass;
import net.weg.userapi.model.entity.annotation.AnnotationStudent;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.repository.AnnotationStudentRepository;
import net.weg.userapi.service.council.CouncilService;
import net.weg.userapi.service.users.StudentService;
import net.weg.userapi.service.users.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class AnnotationStudentService {

    private AnnotationStudentRepository repository;
    private StudentService studentService;
    private TeacherService teacherService;
    private CouncilService councilService;

    private ModelMapper modelMapper;

    public Page<AnnotationStudentResponseDTO> findAnnotationStudentSpec(Specification<AnnotationStudent> spec, Pageable pageable) {
        Page<AnnotationStudent> annotationStudents = repository.findAll(spec, pageable);
        return annotationStudents.map(annotationStudent -> modelMapper.map(annotationStudent, AnnotationStudentResponseDTO.class));
    }

    public AnnotationStudentResponseDTO createAnnotationStudent(AnnotationStudentRequestDTO annotationStudentRequestDTO) {
        AnnotationStudent annotationStudent = modelMapper.map(annotationStudentRequestDTO, AnnotationStudent.class);

        Council council = councilService.findCouncilEntity(annotationStudentRequestDTO.getCouncil_id());

        if (!council.getTeachers().contains(teacherService.findTeacherEntity(annotationStudentRequestDTO.getTeacher_id()))) {
            throw new UserNotAssociatedException("The teacher is not associated with this council");
        }

        if (!council.getAClass().getStudents().contains(studentService.findStudentEntity(annotationStudentRequestDTO.getStudent_id()))) {
            throw new UserNotAssociatedException("The student is not associated with this council");
        }

        annotationStudent.setCouncil(council); //SETAR CONSELHO
        annotationStudent.setStudent(studentService.findStudentEntity(annotationStudentRequestDTO.getStudent_id())); //SETAR ALUNO
        annotationStudent.setTeacher(teacherService.findTeacherEntity(annotationStudentRequestDTO.getTeacher_id())); //SETAR PROFESSOR

        AnnotationStudent annotationSaved = repository.save(annotationStudent);

        return modelMapper.map(annotationSaved, AnnotationStudentResponseDTO.class);
    }

    public AnnotationStudentResponseDTO findAnnotationStudent(Integer id) {
        AnnotationStudent annotationStudent = findAnnotationEntity(id);

        return modelMapper.map(annotationStudent, AnnotationStudentResponseDTO.class);
    }

    public AnnotationStudent findAnnotationEntity(Integer id) {
        return repository.findById(id).orElseThrow(() -> new AnnotationNotFoundException("Student annotation not found"));
    }

    public Page<AnnotationStudentResponseDTO> pageAnnotationStudent(Pageable pageable) {
        Page<AnnotationStudent> annotationStudent = repository.findAll(pageable);

        return annotationStudent.map(annotation -> modelMapper.map(annotation, AnnotationStudentResponseDTO.class));
    }

    public Page<AnnotationStudentResponseDTO> pageAnnotationsByStudent(Integer id, Pageable pageable) {
        Page<AnnotationStudent> annotationStudent = repository.findAllByStudent_Id(pageable, id);

        return annotationStudent.map(annotation -> modelMapper.map(annotation, AnnotationStudentResponseDTO.class));
    }

    public AnnotationStudentResponseDTO updateAnnotationStudent(AnnotationStudentRequestDTO annotationStudentRequestDTO, Integer id) {
        AnnotationStudent annotationStudent = findAnnotationEntity(id);
        modelMapper.map(annotationStudentRequestDTO, annotationStudent);

        annotationStudent.setTeacher(teacherService.findTeacherEntity(annotationStudentRequestDTO.getTeacher_id()));
        annotationStudent.setStudent(studentService.findStudentEntity(annotationStudentRequestDTO.getStudent_id()));

        AnnotationStudent updatedAnnotationStudent = repository.save(annotationStudent);
        return modelMapper.map(updatedAnnotationStudent, AnnotationStudentResponseDTO.class);
    }

    public AnnotationStudentResponseDTO deleteAnnotationStudent(Integer id) {
        AnnotationStudent annotationStudent = findAnnotationEntity(id);
        AnnotationStudentResponseDTO annotationStudentResponseDTO = modelMapper.map(annotationStudent, AnnotationStudentResponseDTO.class);
        repository.delete(annotationStudent);
        return annotationStudentResponseDTO;
    }

}
