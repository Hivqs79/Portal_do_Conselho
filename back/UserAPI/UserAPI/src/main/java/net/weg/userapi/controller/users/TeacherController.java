package net.weg.userapi.controller.users;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.users.TeacherRequestDTO;
import net.weg.userapi.model.dto.response.ClassResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;
import net.weg.userapi.service.users.TeacherService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PatchMapping("/add-class/{id}")
    public ResponseEntity<TeacherResponseDTO> addTeacherClasses(@RequestBody List<Integer> classes_id, @PathVariable Integer id) {
        return new ResponseEntity<>(service.addTeacherClasss(id, classes_id), HttpStatus.OK);
    }

    @PatchMapping("/remove-class/{id}")
    public ResponseEntity<TeacherResponseDTO> removeTeacherClasses(@RequestBody List<Integer> classes_id, @PathVariable Integer id) {
        return new ResponseEntity<>(service.removeTeacherClasss(id, classes_id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TeacherResponseDTO> deleteTeacher(@PathVariable Integer id) {
        return new ResponseEntity<>(service.deleteTeacher(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherResponseDTO> getTeacher(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findTeacher(id), HttpStatus.OK);
    }

    @GetMapping("/classes/{id}")
    public ResponseEntity<List<ClassResponseDTO>> getClassesByTeacher(@PathVariable Integer id) {
        return new ResponseEntity<>(service.getClassByTeacher(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<TeacherResponseDTO>> getAllTeacher(Pageable pageable) {
        return new ResponseEntity<>(service.pageTeacher(pageable), HttpStatus.OK);
    }

    @PostMapping("/mock")
    public ResponseEntity<Void> postAllTeacher(@RequestBody List<TeacherRequestDTO> teacherRequestDTOS) {
        service.mockarTeacher(teacherRequestDTOS);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
