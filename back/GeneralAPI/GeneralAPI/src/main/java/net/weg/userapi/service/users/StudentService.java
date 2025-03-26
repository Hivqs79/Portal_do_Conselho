package net.weg.userapi.service.users;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.KafkaException;
import net.weg.userapi.exception.exceptions.UserNotFoundException;
import net.weg.userapi.service.kafka.KafkaMessage;
import net.weg.userapi.model.dto.request.users.StudentRequestDTO;
import net.weg.userapi.model.dto.response.users.StudentResponseDTO;
import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.model.entity.users.Student;
import net.weg.userapi.repository.StudentRepository;
import net.weg.userapi.service.classes.ClassService;
import net.weg.userapi.service.kafka.KafkaProducerService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentService {

    private StudentRepository repository;
    private ClassService classService;
    private CustomizationService customizationService;
    private ModelMapper modelMapper;
    private KafkaProducerService kafkaProducerService;
    private final ObjectMapper objectMapper;

    public Page<StudentResponseDTO> findStudentSpec(Specification<Student> spec, Pageable pageable) {
        Page<Student> students = repository.findAll(spec, pageable);
        return students.map(student -> modelMapper.map(student, StudentResponseDTO.class));
    }

    public StudentResponseDTO createStudent(StudentRequestDTO studentRequestDTO) {
        Student student = modelMapper.map(studentRequestDTO, Student.class);

        student.setClasses(classService.getClassesByIdList(studentRequestDTO.getClasses_id()));
        Student studentSaved = repository.save(student);
        studentSaved.setCustomization(customizationService.setDefault(studentSaved));

        //this.sendStudentEvent(student, "POST");
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
        return modelMapper.map(updatedStudent, StudentResponseDTO.class);
    }

    public StudentResponseDTO deleteStudent(Long id) {
        Student student = findStudentEntity(id);
        StudentResponseDTO studentResponseDTO = modelMapper.map(student, StudentResponseDTO.class);
        repository.delete(student);
        return studentResponseDTO;
    }

    public void mockarStudent(List<StudentRequestDTO> studentRequestDTOS) {
        List<Student> students = studentRequestDTOS.stream().map(studentRequestDTO -> modelMapper.map(studentRequestDTO, Student.class)).collect(Collectors.toList());
        repository.saveAll(students);
    }

    public void sendStudentEvent(Student student, String httpMethod) {
        try {
            KafkaMessage message = new KafkaMessage();
            message.setHttpMethod(httpMethod);
            message.setObject(student);

            String jsonMessage = objectMapper.writeValueAsString(message);

            kafkaProducerService.sendMessage("student", jsonMessage);
        } catch (JsonProcessingException e) {
            throw new KafkaException("Failed to serialize KafkaMessage object" + e);
        }
    }

    public StudentResponseDTO addStudentClasss(Long id, List<Long> classesId) {
        Student student = findStudentEntity(id);
        List<Class> classes = student.getClasses();

        classesId.forEach(integer -> {
            Class aClass = classService.findClassEntity(integer);
            if (!classes.contains(aClass)) {
                classes.add(aClass);
            }
        });
        student.setClasses(classes);
        repository.save(student);

        return modelMapper.map(student, StudentResponseDTO.class);
    }

    public StudentResponseDTO removeStudentClasss(Long id, List<Long> classesId) {
        Student student = findStudentEntity(id);
        List<Class> classes = student.getClasses();

        classesId.forEach(integer -> {
            Class aClass = classService.findClassEntity(integer);
            classes.remove(aClass);
        });
        student.setClasses(classes);
        repository.save(student);

        return modelMapper.map(student, StudentResponseDTO.class);
    }
}
