package net.weg.userapi.controller.users;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.users.TeacherRequestDTO;
import net.weg.userapi.model.dto.response.classes.ClassResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;
import net.weg.userapi.model.entity.users.Teacher;
import net.weg.userapi.service.users.TeacherService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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

    @GetMapping
    public Page<TeacherResponseDTO> searchTeacher (
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "name", spec = Like.class),
                    @Spec(path = "email", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<Teacher> spec, Pageable pageable) {

        return service.findTeacherSpec(spec, pageable);
    }

    @PostMapping
    public ResponseEntity<TeacherResponseDTO> postTeacher(@RequestBody @Validated TeacherRequestDTO teacherRequestDTO) {
        return new ResponseEntity<>(service.createTeacher(teacherRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeacherResponseDTO> putTeacher(@RequestBody @Validated TeacherRequestDTO teacherRequestDTO, @PathVariable Long id) {
        return new ResponseEntity<>(service.updateTeacher(teacherRequestDTO, id), HttpStatus.OK);
    }

    @PatchMapping("/add-class/{id}")
    public ResponseEntity<TeacherResponseDTO> addTeacherClasses(@RequestBody List<Long> classes_id, @PathVariable Long id) {
        return new ResponseEntity<>(service.addTeacherClasss(id, classes_id), HttpStatus.OK);
    }

    @PatchMapping("/remove-class/{id}")
    public ResponseEntity<TeacherResponseDTO> removeTeacherClasses(@RequestBody List<Long> classes_id, @PathVariable Long id) {
        return new ResponseEntity<>(service.removeTeacherClasss(id, classes_id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TeacherResponseDTO> disableTeacher(@PathVariable Long id) {
        return new ResponseEntity<>(service.disableTeacher(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherResponseDTO> getTeacher(@PathVariable Long id) {
        return new ResponseEntity<>(service.findTeacher(id), HttpStatus.OK);
    }

    @GetMapping("/classes/{id}")
    public ResponseEntity<List<ClassResponseDTO>> getClassesByTeacher(@PathVariable Long id) {
        return new ResponseEntity<>(service.getClassByTeacher(id), HttpStatus.OK);
    }

    @PostMapping("/mock")
    public ResponseEntity<Void> postAllTeacher(@RequestBody List<TeacherRequestDTO> teacherRequestDTOS) {
        service.mockarTeacher(teacherRequestDTOS);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
