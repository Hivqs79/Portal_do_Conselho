package net.weg.userapi.service;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.entity.Student;
import net.weg.userapi.repository.StudentRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class StudentService {

    private StudentRepository repository;

    public Student createStudent (Student student) {
        return repository.save(student);
    }

}
