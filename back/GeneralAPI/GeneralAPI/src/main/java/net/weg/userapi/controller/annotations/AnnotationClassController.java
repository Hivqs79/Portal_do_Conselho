package net.weg.userapi.controller.annotations;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.annotation.AnnotationClassRequestDTO;
import net.weg.userapi.model.dto.response.annotation.AnnotationClassResponseDTO;
import net.weg.userapi.model.dto.response.classes.ClassResponseDTO;
import net.weg.userapi.model.entity.annotation.AnnotationClass;
import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.service.annotations.AnnotationClassService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/annotations/class")
@AllArgsConstructor
public class AnnotationClassController {

    private AnnotationClassService service;

    @GetMapping
    public Page<AnnotationClassResponseDTO> searchAnnotationClass(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "rank", spec = Like.class),
                    @Spec(path = "strengths", spec = Like.class),
                    @Spec(path = "toImprove", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<AnnotationClass> spec, Pageable pageable) {

        return service.findAnnotationClassSpec(spec, pageable);
    }

    @PostMapping
    public ResponseEntity<AnnotationClassResponseDTO> postAnnotationClass(@RequestBody @Validated AnnotationClassRequestDTO pedagogicRequestDTO) {
        return new ResponseEntity<>(service.createAnnotationClass(pedagogicRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnnotationClassResponseDTO> putAnnotationClass(@RequestBody @Validated AnnotationClassRequestDTO pedagogicRequestDTO, @PathVariable Integer id) {
        return new ResponseEntity<>(service.updateAnnotationClass(pedagogicRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AnnotationClassResponseDTO> deleteAnnotationClass(@PathVariable Integer id) {
        return new ResponseEntity<>(service.deleteAnnotationClass(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnotationClassResponseDTO> getAnnotationClass(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findAnnotationClass(id), HttpStatus.OK);
    }
    
}
