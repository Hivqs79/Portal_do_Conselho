package net.weg.userapi.service.annotations;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.annotation.AnnotationClassRequestDTO;
import net.weg.userapi.model.dto.request.annotation.AnnotationStudentRequestDTO;
import net.weg.userapi.model.dto.response.ClassResponseDTO;
import net.weg.userapi.model.dto.response.annotation.AnnotationClassResponseDTO;
import net.weg.userapi.model.dto.response.annotation.AnnotationStudentResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;
import net.weg.userapi.model.entity.annotation.AnnotationClass;
import net.weg.userapi.model.entity.annotation.AnnotationStudent;
import net.weg.userapi.repository.AnnotationClassRepository;
import net.weg.userapi.service.ClassService;
import net.weg.userapi.service.TeacherService;
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
    private ModelMapper modelMapper;

    @PostConstruct
    public void configureModelMapper() {
        modelMapper.createTypeMap(AnnotationClass.class, AnnotationClassResponseDTO.class)
                .addMappings(mapper -> {
                    mapper.map(src -> src.getTeacher(), AnnotationClassResponseDTO::setTeacherResponseDTO);
                    mapper.map(src -> src.getAClass(), AnnotationClassResponseDTO::setClassResponseDTO);
                });
    }

    public AnnotationClassResponseDTO createAnnotationClass(AnnotationClassRequestDTO annotationClassRequestDTO) {
        AnnotationClass annotationClass = modelMapper.map(annotationClassRequestDTO, AnnotationClass.class);

        annotationClass.setAClass(classService.findClassEntity(annotationClassRequestDTO.getClass_id())); //SETAR CLASSE
        annotationClass.setTeacher(teacherService.findTeacherEntity(annotationClassRequestDTO.getTeacher_id())); //SETAR PROFESSOR
        annotationClass.setReleaseDate(OffsetDateTime.now()); //SETAR PROFESSOR

        AnnotationClass annotationSaved = repository.save(annotationClass);

        return modelMapper.map(annotationSaved, AnnotationClassResponseDTO.class);
    }

    public AnnotationClassResponseDTO findAnnotationClass(Integer id) {
        AnnotationClass annotationClass = findAnnotationEntity(id);

        return modelMapper.map(annotationClass, AnnotationClassResponseDTO.class);
    }

    public AnnotationClass findAnnotationEntity(Integer id) {
        return repository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Page<AnnotationClassResponseDTO> pageAnnotationClass(Pageable pageable) {
        Page<AnnotationClass> annotationClass = repository.findAll(pageable);

        return annotationClass.map(annotation -> modelMapper.map(annotation, AnnotationClassResponseDTO.class));
    }

    public AnnotationClassResponseDTO updateAnnotationClass(AnnotationClassRequestDTO annotationClassRequestDTO, Integer id) {
        AnnotationClass annotationClass = findAnnotationEntity(id);
        modelMapper.map(annotationClassRequestDTO, annotationClass);

        annotationClass.setTeacher(teacherService.findTeacherEntity(annotationClassRequestDTO.getTeacher_id()));
        annotationClass.setAClass(classService.findClassEntity(annotationClassRequestDTO.getClass_id()));

        AnnotationClass updatedAnnotationClass = repository.save(annotationClass);
        return modelMapper.map(updatedAnnotationClass, AnnotationClassResponseDTO.class);
    }

    public AnnotationClassResponseDTO deleteAnnotationClass(Integer id) {
        AnnotationClass annotationClass = findAnnotationEntity(id);
        repository.delete(annotationClass);
        return modelMapper.map(annotationClass, AnnotationClassResponseDTO.class);
    }

}
