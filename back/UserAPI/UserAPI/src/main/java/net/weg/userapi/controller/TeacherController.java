package net.weg.userapi.controller;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.TeacherRequestDTO;
import net.weg.userapi.model.dto.response.TeacherResponseDTO;
import net.weg.userapi.service.TeacherService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teacher")
@AllArgsConstructor
public class TeacherController {

    private TeacherService service;

    @PostMapping
    public ResponseEntity<TeacherResponseDTO> postTeacher(@RequestBody @Validated TeacherRequestDTO teacherRequestDTO) {
        return new ResponseEntity<>(service.createTeacher(teacherRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeacherResponseDTO> putTeacher(@RequestBody @Validated TeacherRequestDTO teacherRequestDTO, @PathVariable Integer id) {
        return new ResponseEntity<>(service.updateTeacher(teacherRequestDTO, id), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TeacherResponseDTO> patchTeacherClass(@RequestBody @Validated TeacherRequestDTO teacherRequestDTO, @PathVariable Integer id) {
        return new ResponseEntity<>(service.updateTeacher(teacherRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TeacherResponseDTO> deleteTeacher(@PathVariable Integer id) {
        return new ResponseEntity<>(service.deleteTeacher(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherResponseDTO> getTeacher(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findTeacher(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<TeacherResponseDTO>> getAllTeacher(Pageable pageable) {
        return new ResponseEntity<>(service.pageTeacher(pageable), HttpStatus.OK);
    }
}
