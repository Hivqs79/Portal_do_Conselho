package net.weg.userapi.controller;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.ClassRequestDTO;
import net.weg.userapi.model.dto.request.StudentRequestDTO;
import net.weg.userapi.model.dto.response.ClassResponseDTO;
import net.weg.userapi.model.dto.response.StudentResponseDTO;
import net.weg.userapi.model.dto.response.TeacherResponseDTO;
import net.weg.userapi.service.ClassService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/class")
@AllArgsConstructor
public class ClassController {

    private ClassService service;

    @PostMapping
    public ResponseEntity<ClassResponseDTO> postClass(@RequestBody @Validated ClassRequestDTO classRequestDTO) {
        return new ResponseEntity<>(service.createClass(classRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClassResponseDTO> putClass(@RequestBody @Validated ClassRequestDTO classRequestDTO, @PathVariable Integer id) {
        return new ResponseEntity<>(service.updateClass(classRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ClassResponseDTO> deleteClass(@PathVariable Integer id) {
        return new ResponseEntity<>(service.deleteClass(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClassResponseDTO> getClass(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findClass(id), HttpStatus.OK);
    }

    @GetMapping("/teacher/{id}")
    public ResponseEntity<List<TeacherResponseDTO>> getTeachersByClass(@PathVariable Integer id) {
        return new ResponseEntity<>(service.getTeacherByClass(id), HttpStatus.OK);
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<List<StudentResponseDTO>> getStudentByClass(@PathVariable Integer id) {
        return new ResponseEntity<>(service.getStudentsByClass(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<ClassResponseDTO>> getAllClass(Pageable pageable) {
        return new ResponseEntity<>(service.pageClass(pageable), HttpStatus.OK);
    }

    @PostMapping("/mock")
    public ResponseEntity<Void> postAllClass(@RequestBody List<ClassRequestDTO> classRequestDTOS) {
        service.mockarClass(classRequestDTOS);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
