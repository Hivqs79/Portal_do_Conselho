package net.weg.general_api.service.annotations;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.AnnotationNotFoundException;
import net.weg.general_api.exception.exceptions.UserNotAssociatedException;
import net.weg.general_api.model.dto.request.annotation.AnnotationStudentRequestDTO;
import net.weg.general_api.model.dto.response.annotation.AnnotationStudentResponseDTO;
import net.weg.general_api.model.entity.annotation.AnnotationStudent;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.repository.AnnotationStudentRepository;
import net.weg.general_api.service.council.CouncilService;
import net.weg.general_api.service.kafka.KafkaEventSender;
import net.weg.general_api.service.users.StudentService;
import net.weg.general_api.service.users.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class AnnotationStudentService {

    private AnnotationStudentRepository repository;
    private StudentService studentService;
    private TeacherService teacherService;
    private CouncilService councilService;
    private final KafkaEventSender kafkaEventSender;

    private ModelMapper modelMapper;

    public Page<AnnotationStudentResponseDTO> findAnnotationStudentSpec(Specification<AnnotationStudent> spec, Pageable pageable) {
        Page<AnnotationStudent> annotationStudents = repository.getAllByEnabledIsTrue(spec, pageable);
        return annotationStudents.map(annotationStudent -> modelMapper.map(annotationStudent, AnnotationStudentResponseDTO.class));
    }

    @Async
    public CompletableFuture<AnnotationStudentResponseDTO> createAnnotationStudentAsync(
            AnnotationStudentRequestDTO annotationStudentRequestDTO) {

        // Mapeamento inicial (síncrono)
        AnnotationStudent annotationStudent = modelMapper.map(annotationStudentRequestDTO, AnnotationStudent.class);
        System.out.println("Annotation student inicial:, " + annotationStudentRequestDTO.getStudent_id());
        System.out.println(annotationStudent);

        // Buscar conselho, professor e aluno de forma assíncrona e paralela
        CompletableFuture<Council> councilFuture = councilService.findCouncilEntityAsync(annotationStudentRequestDTO.getCouncil_id());
        CompletableFuture<Teacher> teacherFuture = teacherService.findTeacherEntityAsync(annotationStudentRequestDTO.getTeacher_id());
        CompletableFuture<Student> studentFuture = studentService.findStudentEntityAsync(annotationStudentRequestDTO.getStudent_id());
        System.out.println("Começou todos os asyncs, " + annotationStudentRequestDTO.getStudent_id());
        // Combinar todos os resultados
        return CompletableFuture.allOf(councilFuture, teacherFuture, studentFuture)
                .thenComposeAsync(__ -> {
                    System.out.println("Terminou todos os asyncs, " + annotationStudentRequestDTO.getStudent_id());
                    Council council = councilFuture.join();
                    Teacher teacher = teacherFuture.join();
                    Student student = studentFuture.join();

                    // Validações
                    if (!council.getTeachers().contains(teacher)) {
                        throw new UserNotAssociatedException("The teacher is not associated with this council");
                    }

                    if (!council.getAClass().getStudents().contains(student)) {
                        throw new UserNotAssociatedException("The student is not associated with this council");
                    }

                    System.out.println("Passou todos os if, " + annotationStudentRequestDTO.getStudent_id());

                    // Configurar entidade
                    annotationStudent.setCouncil(council);
                    annotationStudent.setStudent(student);
                    annotationStudent.setTeacher(teacher);

                    // Salvar e enviar evento (pode ser feito em outra thread)
                    return CompletableFuture.supplyAsync(() -> {
                        System.out.println("Objeto antes do save, " + annotationStudentRequestDTO.getStudent_id());
                        System.out.println(annotationStudent);
                        System.out.println("passou o print antes do save, " + annotationStudentRequestDTO.getStudent_id());
                        AnnotationStudent annotationSaved = repository.save(annotationStudent);
                        System.out.println("Salvou o annotation, " + annotationStudentRequestDTO.getStudent_id());
                        System.out.println(annotationSaved);
                        System.out.println("Passsou o print, " + annotationStudentRequestDTO.getStudent_id());
                        kafkaEventSender.sendEvent(annotationSaved, "POST", "Annotation student created");
                        return modelMapper.map(annotationSaved, AnnotationStudentResponseDTO.class);
                    });
                });
    }

    public AnnotationStudentResponseDTO findAnnotationStudent(Long id) {
        AnnotationStudent annotationStudent = findAnnotationEntity(id);

        return modelMapper.map(annotationStudent, AnnotationStudentResponseDTO.class);
    }

    public AnnotationStudent findAnnotationEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new AnnotationNotFoundException("Student annotation not found"));
    }

    public Page<AnnotationStudentResponseDTO> pageAnnotationStudent(Pageable pageable) {
        Page<AnnotationStudent> annotationStudent = repository.findAll(pageable);

        return annotationStudent.map(annotation -> modelMapper.map(annotation, AnnotationStudentResponseDTO.class));
    }

    public Page<AnnotationStudentResponseDTO> pageAnnotationsByStudent(Long id, Pageable pageable) {
        Page<AnnotationStudent> annotationStudent = repository.findAllByStudent_Id(pageable, id);

        return annotationStudent.map(annotation -> modelMapper.map(annotation, AnnotationStudentResponseDTO.class));
    }

    public AnnotationStudentResponseDTO updateAnnotationStudent(AnnotationStudentRequestDTO annotationStudentRequestDTO, Long id) {
        AnnotationStudent annotationStudent = findAnnotationEntity(id);
        modelMapper.map(annotationStudentRequestDTO, annotationStudent);

        annotationStudent.setTeacher(teacherService.findTeacherEntity(annotationStudentRequestDTO.getTeacher_id()));
        annotationStudent.setStudent(studentService.findStudentEntity(annotationStudentRequestDTO.getStudent_id()));

        AnnotationStudent updatedAnnotationStudent = repository.save(annotationStudent);
        kafkaEventSender.sendEvent(updatedAnnotationStudent, "PUT", "Student updated");

        return modelMapper.map(updatedAnnotationStudent, AnnotationStudentResponseDTO.class);
    }

    public AnnotationStudentResponseDTO disableAnnotationStudent(Long id) {
        AnnotationStudent annotationStudent = findAnnotationEntity(id);
        annotationStudent.setEnabled(false);
        repository.save(annotationStudent);
        kafkaEventSender.sendEvent(annotationStudent, "DELETE", "Student disabled");

        return modelMapper.map(annotationStudent, AnnotationStudentResponseDTO.class);
    }

    public boolean existsByTeacherCouncilAndStudent(Long teacherId, Long councilId, Long studentId) {
        return repository.existsByTeacher_IdAndCouncil_IdAndStudent_Id(teacherId, councilId, studentId);
    }
}
