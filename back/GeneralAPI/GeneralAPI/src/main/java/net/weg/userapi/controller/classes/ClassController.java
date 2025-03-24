package net.weg.userapi.controller.classes;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.classes.ClassRequestDTO;
import net.weg.userapi.model.dto.response.classes.ClassResponseDTO;
import net.weg.userapi.model.dto.response.users.StudentResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;
import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.service.classes.ClassService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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


    @GetMapping
    public Page<ClassResponseDTO> searchClasses(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "name", spec = Like.class),
                    @Spec(path = "area", spec = Like.class),
                    @Spec(path = "course", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<Class> spec, Pageable pageable) {

        return service.findClassSpec(spec, pageable);
    }

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

    @PostMapping("/mock")
    public ResponseEntity<Void> postAllClass(@RequestBody List<ClassRequestDTO> classRequestDTOS) {
        service.mockarClass(classRequestDTOS);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}





