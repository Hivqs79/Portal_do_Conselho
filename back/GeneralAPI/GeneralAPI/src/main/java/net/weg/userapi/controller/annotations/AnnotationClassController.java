package net.weg.userapi.controller.annotations;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.annotation.AnnotationClassRequestDTO;
import net.weg.userapi.model.dto.response.annotation.AnnotationClassResponseDTO;
import net.weg.userapi.service.annotations.AnnotationClassService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/annotations/class")
@AllArgsConstructor
public class AnnotationClassController {

    private AnnotationClassService service;

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

    @GetMapping
    public ResponseEntity<Page<AnnotationClassResponseDTO>> getAllAnnotationClass(Pageable pageable) {
        return new ResponseEntity<>(service.pageAnnotationClass(pageable), HttpStatus.OK);
    }
    
}
