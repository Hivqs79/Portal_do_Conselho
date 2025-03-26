package net.weg.userapi.controller.users;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.*;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.users.StudentRequestDTO;
import net.weg.userapi.model.dto.response.users.StudentResponseDTO;
import net.weg.userapi.model.entity.users.Student;
import net.weg.userapi.service.users.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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

    @GetMapping
    public Page<StudentResponseDTO> searchStudent(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "name", spec = Like.class),
                    @Spec(path = "email", spec = Like.class),
                    @Spec(path = "isRepresentant", params = "representant", spec = True.class),
                    @Spec(path = "frequency", spec = Equal.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<Student> spec, Pageable pageable) {

        return service.findStudentSpec(spec, pageable);
    }

    @PostMapping
    public ResponseEntity<StudentResponseDTO> postStudent(@RequestBody @Validated StudentRequestDTO studentRequestDTO) {
        return new ResponseEntity<>(service.createStudent(studentRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> putStudent(@RequestBody @Validated StudentRequestDTO studentRequestDTO, @PathVariable Long id) {
        return new ResponseEntity<>(service.updateStudent(studentRequestDTO, id), HttpStatus.OK);
    }

    @PatchMapping("/add-class/{id}")
    public ResponseEntity<StudentResponseDTO> addStudentClasses(@RequestBody List<Long> classes_id, @PathVariable Long id) {
        return new ResponseEntity<>(service.addStudentClasss(id, classes_id), HttpStatus.OK);
    }

    @PatchMapping("/remove-class/{id}")
    public ResponseEntity<StudentResponseDTO> removeStudentClasses(@RequestBody List<Long> classes_id, @PathVariable Long id) {
        return new ResponseEntity<>(service.removeStudentClasss(id, classes_id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> deleteStudent(@PathVariable Long id) {
        return new ResponseEntity<>(service.deleteStudent(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> getStudent(@PathVariable Long id) {
        return new ResponseEntity<>(service.findStudent(id), HttpStatus.OK);
    }

    @PostMapping("/mock")
    public ResponseEntity<Void> postAllStudent(@RequestBody List<StudentRequestDTO> studentRequestDTOS) {
        service.mockarStudent(studentRequestDTOS);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
