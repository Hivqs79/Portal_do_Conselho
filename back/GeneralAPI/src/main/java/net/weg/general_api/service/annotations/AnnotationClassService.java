package net.weg.general_api.service.annotations;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.AnnotationNotFoundException;
import net.weg.general_api.model.dto.request.annotation.AnnotationClassRequestDTO;
import net.weg.general_api.model.dto.response.annotation.AnnotationClassResponseDTO;
import net.weg.general_api.model.entity.annotation.AnnotationClass;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.repository.AnnotationClassRepository;
import net.weg.general_api.service.council.CouncilService;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import net.weg.general_api.service.users.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AnnotationClassService {

    private AnnotationClassRepository repository;
    private TeacherService teacherService;
    private CouncilService councilService;
    private ModelMapper modelMapper;
    private KafkaEventSender kafkaEventSender;

    public Page<AnnotationClassResponseDTO> findAnnotationClassSpec(Specification<AnnotationClass> spec, Pageable pageable) {
        Page<AnnotationClass> annotationClasses = repository.getAllByEnabledIsTrue(spec, pageable);
        return annotationClasses.map(annotationClass -> modelMapper.map(annotationClass, AnnotationClassResponseDTO.class));
    }

    public AnnotationClassResponseDTO createAnnotationClass(AnnotationClassRequestDTO annotationClassRequestDTO) {
        AnnotationClass annotationClass = modelMapper.map(annotationClassRequestDTO, AnnotationClass.class);

        Council council = councilService.findCouncilEntity(annotationClassRequestDTO.getCouncil_id());

        annotationClass.setTeacher(teacherService.findTeacherEntity(annotationClassRequestDTO.getTeacher_id())); //SETAR PROFESSOR
        annotationClass.setCouncil(council); //SETAR CONSELHO

        AnnotationClass annotationSaved = repository.save(annotationClass);
        kafkaEventSender.sendEvent(annotationClass, "POST", "Annotation class created");

        return modelMapper.map(annotationSaved, AnnotationClassResponseDTO.class);
    }

    public AnnotationClassResponseDTO findAnnotationClass(Long id) {
        AnnotationClass annotationClass = findAnnotationEntity(id);

        return modelMapper.map(annotationClass, AnnotationClassResponseDTO.class);
    }

    public AnnotationClass findAnnotationEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new AnnotationNotFoundException("Class annotation not found"));
    }

    public Page<AnnotationClassResponseDTO> pageAnnotationClass(Pageable pageable) {
        Page<AnnotationClass> annotationClass = repository.findAll(pageable);

        return annotationClass.map(annotation -> modelMapper.map(annotation, AnnotationClassResponseDTO.class));
    }

    public AnnotationClassResponseDTO updateAnnotationClass(AnnotationClassRequestDTO annotationClassRequestDTO, Long id) {
        AnnotationClass annotationClass = findAnnotationEntity(id);
        modelMapper.map(annotationClassRequestDTO, annotationClass);

        Council council = councilService.findCouncilEntity(annotationClassRequestDTO.getCouncil_id());

        annotationClass.setTeacher(teacherService.findTeacherEntity(annotationClassRequestDTO.getTeacher_id())); //SETAR PROFESSOR
        annotationClass.setCouncil(council); //SETAR CONSELHO

        AnnotationClass updatedAnnotationClass = repository.save(annotationClass);
        kafkaEventSender.sendEvent(updatedAnnotationClass, "PUT", "Annotation class updated");

        return modelMapper.map(updatedAnnotationClass, AnnotationClassResponseDTO.class);
    }

    public AnnotationClassResponseDTO disableAnnotationClass(Long id) {
        AnnotationClass annotationClass = findAnnotationEntity(id);
        annotationClass.setEnabled(false);
        repository.save(annotationClass);
        kafkaEventSender.sendEvent(annotationClass, "DELETE", "Annotation class disabled");

        return modelMapper.map(annotationClass, AnnotationClassResponseDTO.class);
    }

    public boolean existsByTeacherAndCouncil(Long teacherId, Long councilId) {
        return repository.existsByTeacher_IdAndCouncil_Id(teacherId, councilId);
    }

}
