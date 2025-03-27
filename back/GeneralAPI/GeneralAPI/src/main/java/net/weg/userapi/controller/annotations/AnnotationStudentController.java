package net.weg.userapi.controller.annotations;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.annotation.AnnotationStudentRequestDTO;
import net.weg.userapi.model.dto.response.annotation.AnnotationStudentResponseDTO;
import net.weg.userapi.model.entity.annotation.AnnotationStudent;
import net.weg.userapi.service.annotations.AnnotationStudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/annotations/student")
@AllArgsConstructor
public class AnnotationStudentController {

    private AnnotationStudentService service;

    @GetMapping
    public Page<AnnotationStudentResponseDTO> searchAnnotationStudent (
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "rank", spec = Like.class),
                    @Spec(path = "strengths", spec = Like.class),
                    @Spec(path = "toImprove", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<AnnotationStudent> spec, Pageable pageable) {

        return service.findAnnotationStudentSpec(spec, pageable);
    }

    @PostMapping
    public ResponseEntity<AnnotationStudentResponseDTO> postAnnotationStudent(@RequestBody @Validated AnnotationStudentRequestDTO pedagogicRequestDTO) {
        return new ResponseEntity<>(service.createAnnotationStudent(pedagogicRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnnotationStudentResponseDTO> putAnnotationStudent(@RequestBody @Validated AnnotationStudentRequestDTO pedagogicRequestDTO, @PathVariable Long id) {
        return new ResponseEntity<>(service.updateAnnotationStudent(pedagogicRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AnnotationStudentResponseDTO> disableAnnotationStudent(@PathVariable Long id) {
        return new ResponseEntity<>(service.disableAnnotationStudent(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnotationStudentResponseDTO> getAnnotationStudent(@PathVariable Long id) {
        return new ResponseEntity<>(service.findAnnotationStudent(id), HttpStatus.OK);
    }

    @GetMapping("/by/{id}")
    public ResponseEntity<Page<AnnotationStudentResponseDTO>> getAnnotationByOneStudent(@PathVariable Long id, Pageable pageable) {
        return new ResponseEntity<>(service.pageAnnotationsByStudent(id, pageable), HttpStatus.OK);
    }
    
}
