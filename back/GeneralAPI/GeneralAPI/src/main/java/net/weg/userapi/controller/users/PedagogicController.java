package net.weg.userapi.controller.users;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.users.PedagogicRequestDTO;
import net.weg.userapi.model.dto.response.users.PedagogicResponseDTO;
import net.weg.userapi.model.entity.users.Pedagogic;
import net.weg.userapi.service.users.PedagogicService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedagogic")
@AllArgsConstructor
public class PedagogicController {

    private PedagogicService service;

    @GetMapping
    public Page<PedagogicResponseDTO> searchPedagogic(
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "name", spec = Like.class),
                    @Spec(path = "email", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<Pedagogic> spec, Pageable pageable) {

        return service.findPedagogicSpec(spec, pageable);
    }

    @PostMapping
    public ResponseEntity<PedagogicResponseDTO> postPedagogic(@RequestBody @Validated PedagogicRequestDTO pedagogicRequestDTO) {
        return new ResponseEntity<>(service.createPedagogic(pedagogicRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedagogicResponseDTO> putPedagogic(@RequestBody @Validated PedagogicRequestDTO pedagogicRequestDTO, @PathVariable Long id) {
        return new ResponseEntity<>(service.updatePedagogic(pedagogicRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PedagogicResponseDTO> deletePedagogic(@PathVariable Long id) {
        return new ResponseEntity<>(service.deletePedagogic(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedagogicResponseDTO> getPedagogic(@PathVariable Long id) {
        return new ResponseEntity<>(service.findPedagogic(id), HttpStatus.OK);
    }

    @PostMapping("/mock")
    public ResponseEntity<Void> postAllPedagogic(@RequestBody List<PedagogicRequestDTO> pedagogicRequestDTOS) {
        service.mockarPedagogic(pedagogicRequestDTOS);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
