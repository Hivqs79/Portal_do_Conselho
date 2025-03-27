package net.weg.userapi.controller.preCouncil;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.preCouncil.PreCouncilRequestDTO;
import net.weg.userapi.model.dto.response.preCouncil.PreCouncilResponseDTO;
import net.weg.userapi.model.entity.preCouncil.PreCouncil;
import net.weg.userapi.service.preCouncil.PreCouncilService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pre-council")
@AllArgsConstructor
public class PreCouncilController {

    private PreCouncilService service;

    @GetMapping
    public Page<PreCouncilResponseDTO> searchPreCouncil(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "council.aClass.name", params = "councilClassName", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<PreCouncil> spec, Pageable pageable) {

        return service.findPreCouncilSpec(spec, pageable);
    }

    @PostMapping
    public ResponseEntity<PreCouncilResponseDTO> postPreCouncil(@RequestBody @Validated PreCouncilRequestDTO preCouncilRequestDTO) {
        return new ResponseEntity<>(service.createPreCouncil(preCouncilRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PreCouncilResponseDTO> putPreCouncil(@RequestBody @Validated PreCouncilRequestDTO preCouncilRequestDTO, @PathVariable Long id) {
        return new ResponseEntity<>(service.updatePreCouncil(preCouncilRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PreCouncilResponseDTO> disablePreCouncil(@PathVariable Long id) {
        return new ResponseEntity<>(service.disablePreCouncil(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PreCouncilResponseDTO> getPreCouncil(@PathVariable Long id) {
        return new ResponseEntity<>(service.findPreCouncil(id), HttpStatus.OK);
    }
    
}
