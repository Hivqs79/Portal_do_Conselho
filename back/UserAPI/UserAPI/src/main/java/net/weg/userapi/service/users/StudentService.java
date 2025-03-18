package net.weg.userapi.service.users;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import net.weg.userapi.model.KafkaMessage;
import net.weg.userapi.model.dto.request.StudentRequestDTO;
import net.weg.userapi.model.dto.response.StudentResponseDTO;
import net.weg.userapi.model.entity.Student;
import net.weg.userapi.repository.StudentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentService {

    private StudentRepository repository;
    private ModelMapper modelMapper;
    private KafkaProducerService kafkaProducerService;
    private final ObjectMapper objectMapper;

    public StudentResponseDTO createStudent(StudentRequestDTO studentRequestDTO) {
        Student student = modelMapper.map(studentRequestDTO, Student.class);
        Student studentSaved = repository.save(student);
        this.sendStudentEvent(student, "POST");
        return modelMapper.map(studentSaved, StudentResponseDTO.class);
    }

    public StudentResponseDTO findStudent(Integer id) {
        Student studentFound = findStudentEntity(id);

        return modelMapper.map(studentFound, StudentResponseDTO.class);
    }

    public Student findStudentEntity(Integer id) {
        return repository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Page<StudentResponseDTO> pageStudent(Pageable pageable) {
        Page<Student> studentPage = repository.findAll(pageable);

        return studentPage.map(student -> modelMapper.map(student, StudentResponseDTO.class));
    }

    public StudentResponseDTO updateStudent(StudentRequestDTO studentRequestDTO, Integer id) {
        Student student = findStudentEntity(id);
        modelMapper.map(studentRequestDTO, student);
        student.setClasses(studentRequestDTO.getClasses()); //ATUALIZAR O MANY TO MANY
        Student updatedStudent = repository.save(student);
        return modelMapper.map(updatedStudent, StudentResponseDTO.class);
    }

    public StudentResponseDTO deleteStudent(Integer id) {
        Student student = findStudentEntity(id);
        repository.delete(student);
        return modelMapper.map(student, StudentResponseDTO.class);
    }

    public void mockarStudent (List<StudentRequestDTO> studentRequestDTOS) {
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
            e.printStackTrace();
            throw new RuntimeException("Failed to serialize KafkaMessage object", e);
        }
    }

}
