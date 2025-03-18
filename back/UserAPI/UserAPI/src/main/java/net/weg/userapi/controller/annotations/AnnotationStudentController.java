package net.weg.userapi.controller.annotations;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.annotation.AnnotationStudentRequestDTO;
import net.weg.userapi.model.dto.response.annotation.AnnotationStudentResponseDTO;
import net.weg.userapi.service.annotations.AnnotationStudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/annotations/student")
@AllArgsConstructor
public class AnnotationStudentController {

    private AnnotationStudentService service;

    @PostMapping
    public ResponseEntity<AnnotationStudentResponseDTO> postAnnotationStudent(@RequestBody @Validated AnnotationStudentRequestDTO pedagogicRequestDTO) {
        return new ResponseEntity<>(service.createAnnotationStudent(pedagogicRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnnotationStudentResponseDTO> putAnnotationStudent(@RequestBody @Validated AnnotationStudentRequestDTO pedagogicRequestDTO, @PathVariable Integer id) {
        return new ResponseEntity<>(service.updateAnnotationStudent(pedagogicRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AnnotationStudentResponseDTO> deleteAnnotationStudent(@PathVariable Integer id) {
        return new ResponseEntity<>(service.deleteAnnotationStudent(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnnotationStudentResponseDTO> getAnnotationStudent(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findAnnotationStudent(id), HttpStatus.OK);
    }

    @GetMapping("/by/{id}")
    public ResponseEntity<Page<AnnotationStudentResponseDTO>> getAnnotationByOneStudent(@PathVariable Integer id, Pageable pageable) {
        return new ResponseEntity<>(service.pageAnnotationsByStudent(id, pageable), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<AnnotationStudentResponseDTO>> getAllAnnotationStudent(Pageable pageable) {
        return new ResponseEntity<>(service.pageAnnotationStudent(pageable), HttpStatus.OK);
    }
    
}
