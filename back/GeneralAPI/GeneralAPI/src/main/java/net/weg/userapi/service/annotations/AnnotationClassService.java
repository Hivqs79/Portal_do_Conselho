package net.weg.userapi.service.annotations;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.AnnotationNotFoundException;
import net.weg.userapi.model.dto.request.annotation.AnnotationClassRequestDTO;
import net.weg.userapi.model.dto.response.annotation.AnnotationClassResponseDTO;
import net.weg.userapi.model.dto.response.annotation.AnnotationStudentResponseDTO;
import net.weg.userapi.model.entity.annotation.AnnotationClass;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.repository.AnnotationClassRepository;
import net.weg.userapi.service.ClassService;
import net.weg.userapi.service.council.CouncilService;
import net.weg.userapi.service.users.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class AnnotationClassService {

    private AnnotationClassRepository repository;
    private ClassService classService;
    private TeacherService teacherService;
    private CouncilService councilService;
    private ModelMapper modelMapper;

    public AnnotationClassResponseDTO createAnnotationClass(AnnotationClassRequestDTO annotationClassRequestDTO) {
        AnnotationClass annotationClass = modelMapper.map(annotationClassRequestDTO, AnnotationClass.class);

        Council council = councilService.findCouncilEntity(annotationClassRequestDTO.getCouncil_id());

        annotationClass.setTeacher(teacherService.findTeacherEntity(annotationClassRequestDTO.getTeacher_id())); //SETAR PROFESSOR
        annotationClass.setCouncil(council); //SETAR CONSELHO
        annotationClass.setReleaseDate(OffsetDateTime.now()); //SETAR HORARIO

        AnnotationClass annotationSaved = repository.save(annotationClass);

        return modelMapper.map(annotationSaved, AnnotationClassResponseDTO.class);
    }

    public AnnotationClassResponseDTO findAnnotationClass(Integer id) {
        AnnotationClass annotationClass = findAnnotationEntity(id);

        return modelMapper.map(annotationClass, AnnotationClassResponseDTO.class);
    }

    public AnnotationClass findAnnotationEntity(Integer id) {
        return repository.findById(id).orElseThrow(() -> new AnnotationNotFoundException("Class annotation not found"));
    }

    public Page<AnnotationClassResponseDTO> pageAnnotationClass(Pageable pageable) {
        Page<AnnotationClass> annotationClass = repository.findAll(pageable);

        return annotationClass.map(annotation -> modelMapper.map(annotation, AnnotationClassResponseDTO.class));
    }

    public AnnotationClassResponseDTO updateAnnotationClass(AnnotationClassRequestDTO annotationClassRequestDTO, Integer id) {
        AnnotationClass annotationClass = findAnnotationEntity(id);
        modelMapper.map(annotationClassRequestDTO, annotationClass);

        Council council = councilService.findCouncilEntity(annotationClassRequestDTO.getCouncil_id());

        annotationClass.setTeacher(teacherService.findTeacherEntity(annotationClassRequestDTO.getTeacher_id())); //SETAR PROFESSOR
        annotationClass.setCouncil(council); //SETAR CONSELHO

        AnnotationClass updatedAnnotationClass = repository.save(annotationClass);
        return modelMapper.map(updatedAnnotationClass, AnnotationClassResponseDTO.class);
    }

    public AnnotationClassResponseDTO deleteAnnotationClass(Integer id) {
        AnnotationClass annotationClass = findAnnotationEntity(id);
        AnnotationClassResponseDTO annotationClassResponseDTO = modelMapper.map(annotationClass, AnnotationClassResponseDTO.class);
        repository.delete(annotationClass);
        return annotationClassResponseDTO;
    }

}
