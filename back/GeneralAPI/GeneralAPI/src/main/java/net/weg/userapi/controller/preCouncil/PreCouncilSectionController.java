package net.weg.userapi.controller.preCouncil;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.preCouncil.PreCouncilSectionRequestDTO;
import net.weg.userapi.model.dto.response.preCouncil.PreCouncilSectionResponseDTO;
import net.weg.userapi.model.entity.preCouncil.PreCouncilSection;
import net.weg.userapi.service.preCouncil.PreCouncilSectionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pre-council/section")
@AllArgsConstructor
public class PreCouncilSectionController {

    private PreCouncilSectionService service;

    @GetMapping
    public Page<PreCouncilSectionResponseDTO> searchPreCouncilSection(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "topic", spec = Like.class),
                    @Spec(path = "description", spec = Like.class),
                    @Spec(path = "strengths", spec = Like.class),
                    @Spec(path = "toImprove", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<PreCouncilSection> spec, Pageable pageable) {

        return service.findPreCouncilSectionSpec(spec, pageable);
    }

    @PostMapping
    public ResponseEntity<PreCouncilSectionResponseDTO> postPreCouncil(@RequestBody @Validated PreCouncilSectionRequestDTO preCouncilRequestDTO) {
        return new ResponseEntity<>(service.createPreCouncilSection(preCouncilRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PreCouncilSectionResponseDTO> putPreCouncil(@RequestBody @Validated PreCouncilSectionRequestDTO preCouncilRequestDTO, @PathVariable Long id) {
        return new ResponseEntity<>(service.updatePreCouncilSection(preCouncilRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PreCouncilSectionResponseDTO> disablePreCouncil(@PathVariable Long id) {
        return new ResponseEntity<>(service.disablePreCouncilSection(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PreCouncilSectionResponseDTO> getPreCouncil(@PathVariable Long id) {
        return new ResponseEntity<>(service.findPreCouncilSection(id), HttpStatus.OK);
    }

}
