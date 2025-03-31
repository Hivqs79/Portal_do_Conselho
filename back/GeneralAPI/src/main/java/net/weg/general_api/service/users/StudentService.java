package net.weg.general_api.service.users;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.service.kafka.KafkaEventSender;
import net.weg.general_api.model.dto.request.users.StudentRequestDTO;
import net.weg.general_api.model.dto.response.users.StudentResponseDTO;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.repository.StudentRepository;
import net.weg.general_api.service.classes.ClassService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentService {

    private StudentRepository repository;
    private ClassService classService;
    private CustomizationService customizationService;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;

    public Page<StudentResponseDTO> findStudentSpec(Specification<Student> spec, Pageable pageable) {
        Page<Student> students = repository.getAllByEnabledIsTrue(spec, pageable);
        return students.map(student -> modelMapper.map(student, StudentResponseDTO.class));
    }

    public StudentResponseDTO createStudent(StudentRequestDTO studentRequestDTO) {
        Student student = modelMapper.map(studentRequestDTO, Student.class);

        student.setClasses(classService.getClassesByIdList(studentRequestDTO.getClasses_id()));
        Student studentSaved = repository.save(student);
        studentSaved.setCustomization(customizationService.setDefault(studentSaved));

        kafkaEventSender.sendEvent(studentSaved, "POST", "New student created");
        return modelMapper.map(studentSaved, StudentResponseDTO.class);
    }

    public StudentResponseDTO findStudent(Long id) {
        Student studentFound = findStudentEntity(id);

        return modelMapper.map(studentFound, StudentResponseDTO.class);
    }

    public Student findStudentEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException("Student user not found"));
    }

    public StudentResponseDTO updateStudent(StudentRequestDTO studentRequestDTO, Long id) {
        Student student = findStudentEntity(id);
        modelMapper.map(studentRequestDTO, student);

        student.setClasses(classService.getClassesByIdList(studentRequestDTO.getClasses_id()));

        Student updatedStudent = repository.save(student);
        kafkaEventSender.sendEvent(updatedStudent, "PUT", "Student updated");
        return modelMapper.map(updatedStudent, StudentResponseDTO.class);
    }

    public StudentResponseDTO disableStudent(Long id) {
        Student student = findStudentEntity(id);
        student.setEnabled(false);
        repository.save(student);
        kafkaEventSender.sendEvent(student, "DELETE", "Student deleted");
        return modelMapper.map(student, StudentResponseDTO.class);
    }

    public StudentResponseDTO addStudentClass(Long id, List<Long> classesId) {
        Student student = findStudentEntity(id);
        List<Class> classes = student.getClasses();

        classesId.forEach(integer -> {
            Class aClass = classService.findClassEntity(integer);
            if (!classes.contains(aClass)) {
                kafkaEventSender.sendEvent(student, "PATCH", "Student updated to new class: " + aClass);
                classes.add(aClass);
            }
        });
        student.setClasses(classes);
        repository.save(student);

        return modelMapper.map(student, StudentResponseDTO.class);
    }

    public StudentResponseDTO removeStudentClass(Long id, List<Long> classesId) {
        Student student = findStudentEntity(id);
        List<Class> classes = student.getClasses();

        classesId.forEach(integer -> {
            Class aClass = classService.findClassEntity(integer);
            kafkaEventSender.sendEvent(student, "PATCH", "Student removed from your class: " + aClass);
            classes.remove(aClass);
        });
        student.setClasses(classes);
        repository.save(student);

        return modelMapper.map(student, StudentResponseDTO.class);
    }
}
