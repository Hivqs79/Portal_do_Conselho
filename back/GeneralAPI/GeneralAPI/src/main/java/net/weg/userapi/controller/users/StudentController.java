package net.weg.userapi.controller.users;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.users.StudentRequestDTO;
import net.weg.userapi.model.dto.response.users.StudentResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;
import net.weg.userapi.service.users.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@AllArgsConstructor
public class StudentController {

    private StudentService service;

    @PostMapping
    public ResponseEntity<StudentResponseDTO> postStudent(@RequestBody @Validated StudentRequestDTO studentRequestDTO) {
        return new ResponseEntity<>(service.createStudent(studentRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> putStudent(@RequestBody @Validated StudentRequestDTO studentRequestDTO, @PathVariable Integer id) {
        return new ResponseEntity<>(service.updateStudent(studentRequestDTO, id), HttpStatus.OK);
    }

    @PatchMapping("/add-class/{id}")
    public ResponseEntity<StudentResponseDTO> addStudentClasses(@RequestBody List<Integer> classes_id, @PathVariable Integer id) {
        return new ResponseEntity<>(service.addStudentClasss(id, classes_id), HttpStatus.OK);
    }

    @PatchMapping("/remove-class/{id}")
    public ResponseEntity<StudentResponseDTO> removeStudentClasses(@RequestBody List<Integer> classes_id, @PathVariable Integer id) {
        return new ResponseEntity<>(service.removeStudentClasss(id, classes_id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> deleteStudent(@PathVariable Integer id) {
        return new ResponseEntity<>(service.deleteStudent(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> getStudent(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findStudent(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<StudentResponseDTO>> getAllStudent(Pageable pageable) {
        return new ResponseEntity<>(service.pageStudent(pageable), HttpStatus.OK);
    }

    @PostMapping("/mock")
    public ResponseEntity<Void> postAllStudent(@RequestBody List<StudentRequestDTO> studentRequestDTOS) {
        service.mockarStudent(studentRequestDTOS);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
