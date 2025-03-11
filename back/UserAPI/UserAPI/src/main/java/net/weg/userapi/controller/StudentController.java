package net.weg.userapi.controller;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.entity.Student;
import net.weg.userapi.repository.StudentRepository;
import net.weg.userapi.service.StudentService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
@AllArgsConstructor
public class StudentController {

    private StudentService service;

    @PostMapping
    public Student postStudent (@RequestBody Student student) {
        return service.createStudent(student);
    }

}
