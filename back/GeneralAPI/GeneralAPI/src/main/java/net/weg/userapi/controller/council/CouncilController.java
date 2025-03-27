package net.weg.userapi.controller.council;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.council.CouncilRequestDTO;
import net.weg.userapi.model.dto.response.council.CouncilResponseDTO;
import net.weg.userapi.model.entity.annotation.Annotation;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.service.council.CouncilService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/council")
@AllArgsConstructor
public class CouncilController {

    private CouncilService service;

    @GetMapping
    public Page<CouncilResponseDTO> searchCouncil(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "aClass.name", params = "className", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<Council> spec, Pageable pageable) {

        return service.findCouncilSpec(spec, pageable);
    }

    @PostMapping
    public ResponseEntity<CouncilResponseDTO> postCouncil(@RequestBody @Validated CouncilRequestDTO councilRequestDTO) {
        return new ResponseEntity<>(service.createCouncil(councilRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CouncilResponseDTO> putCouncil(@RequestBody @Validated CouncilRequestDTO councilRequestDTO, @PathVariable Long id) {
        return new ResponseEntity<>(service.updateCouncil(councilRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CouncilResponseDTO> disableCouncil(@PathVariable Long id) {
        return new ResponseEntity<>(service.disableCouncil(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CouncilResponseDTO> getCouncil(@PathVariable Long id) {
        return new ResponseEntity<>(service.findCouncil(id), HttpStatus.OK);
    }

    @GetMapping("/annotations/{id}")
    public ResponseEntity<List<Annotation>> getAllAnnotation(@PathVariable Long id) {
        return new ResponseEntity<>(service.getAllAnnotations(id), HttpStatus.OK);
    }
}
