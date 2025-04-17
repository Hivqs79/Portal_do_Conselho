package net.weg.general_api.service.users;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.enums.RoleENUM;
import net.weg.general_api.service.kafka.KafkaEventSender;
import net.weg.general_api.model.dto.request.users.StudentRequestDTO;
import net.weg.general_api.model.dto.response.users.StudentResponseDTO;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.repository.StudentRepository;
import net.weg.general_api.service.classes.ClassService;
import net.weg.general_api.service.security.EmailApiClient;
import net.weg.general_api.service.security.EmailService;
import net.weg.general_api.service.security.PasswordGeneratorService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentService {

    private final StudentRepository repository;
    private final ClassService classService;
    private final CustomizationService customizationService;
    private final UserAuthenticationService userAuthenticationService;
    private final ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;
    private final EmailService emailService;

    public Page<StudentResponseDTO> findStudentSpec(Specification<Student> spec, Pageable pageable) {
        Page<Student> students = repository.getAllByEnabledIsTrue(spec, pageable);
        return students.map(student -> modelMapper.map(student, StudentResponseDTO.class));
    }

    public StudentResponseDTO createStudent(StudentRequestDTO studentRequestDTO) {
        Student student = modelMapper.map(studentRequestDTO, Student.class);

        String randomPassword = PasswordGeneratorService.generateSimpleAlphanumericPassword();

        student.setUserAuthentication(
                userAuthenticationService.saveUserAuthentication(studentRequestDTO.getEmail(), randomPassword, RoleENUM.STUDENT)
        );

        student.setClasses(classService.getClassesByIdList(studentRequestDTO.getClasses_id()));
        Student studentSaved = repository.save(student);
        studentSaved.setCustomization(customizationService.setDefault(studentSaved));

        emailService.sendPasswordEmailAsync(
                studentRequestDTO.getEmail(),
                studentRequestDTO.getName(), // Assumindo que existe um campo name no DTO
                randomPassword
        );

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
        student.getUserAuthentication().setEnabled(false);
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

    public List<Student> getAllStudentsByFrequency() {
        return repository.getAllByLastFrequencyGreaterThan(0);
    }

    public List<Student> getStudentsByFrequency(String className) {
        return repository.findByClassNameAndFrequency(className, 0);
    }

}
