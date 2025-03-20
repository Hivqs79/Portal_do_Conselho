package net.weg.userapi.service.annotations;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.annotation.AnnotationStudentRequestDTO;
import net.weg.userapi.model.dto.response.annotation.AnnotationStudentResponseDTO;
import net.weg.userapi.model.entity.annotation.AnnotationStudent;
import net.weg.userapi.repository.AnnotationStudentRepository;
import net.weg.userapi.service.council.CouncilService;
import net.weg.userapi.service.users.StudentService;
import net.weg.userapi.service.users.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public AnnotationStudentResponseDTO createAnnotationStudent(AnnotationStudentRequestDTO annotationStudentRequestDTO) {
        AnnotationStudent annotationStudent = modelMapper.map(annotationStudentRequestDTO, AnnotationStudent.class);

        annotationStudent.setStudent(studentService.findStudentEntity(annotationStudentRequestDTO.getStudent_id())); //SETAR ALUNO
        annotationStudent.setTeacher(teacherService.findTeacherEntity(annotationStudentRequestDTO.getTeacher_id())); //SETAR PROFESSOR
        annotationStudent.setCouncil(councilService.findCouncilEntity(annotationStudentRequestDTO.getCouncil_id())); //SETAR CONSELHO
        annotationStudent.setReleaseDate(OffsetDateTime.now()); //SETAR DATA

        AnnotationStudent annotationSaved = repository.save(annotationStudent);

        return modelMapper.map(annotationSaved, AnnotationStudentResponseDTO.class);
    }

    public AnnotationStudentResponseDTO findAnnotationStudent(Integer id) {
        AnnotationStudent annotationStudent = findAnnotationEntity(id);

        return modelMapper.map(annotationStudent, AnnotationStudentResponseDTO.class);
    }

    public AnnotationStudent findAnnotationEntity(Integer id) {
        return repository.findById(id).orElseThrow(NoSuchElementException::new);
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
