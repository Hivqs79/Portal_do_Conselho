package net.weg.userapi.controller;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.StudentRequestDTO;
import net.weg.userapi.model.dto.response.StudentResponseDTO;
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
    public StudentResponseDTO postStudent(@RequestBody StudentRequestDTO studentRequestDTO) {
        return service.createStudent(studentRequestDTO);
    }

}
