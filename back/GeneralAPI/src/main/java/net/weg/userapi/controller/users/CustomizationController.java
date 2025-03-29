package net.weg.userapi.controller.users;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.users.CustomizationRequestDTO;
import net.weg.userapi.model.dto.response.users.CustomizationResponseDTO;
import net.weg.userapi.model.entity.users.Customization;
import net.weg.userapi.service.users.CustomizationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customization")
@AllArgsConstructor
public class CustomizationController {

    private CustomizationService service;

    @GetMapping
    public Page<CustomizationResponseDTO> searchCustomization (
            @And({
                    @Spec(path = "id", spec = Equal.class),
            }) Specification<Customization> spec, Pageable pageable) {

        return service.findCustomizationSpec(spec, pageable);
    }

    @PostMapping
    public ResponseEntity<CustomizationResponseDTO> postCustomization(@RequestBody @Validated CustomizationRequestDTO customizationRequestDTO) {
        return new ResponseEntity<>(service.createCustomization(customizationRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomizationResponseDTO> putCustomization(@RequestBody @Validated CustomizationRequestDTO customizationRequestDTO, @PathVariable Long id) {
        return new ResponseEntity<>(service.updateCustomization(customizationRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CustomizationResponseDTO> deleteCustomization(@PathVariable Long id) {
        return new ResponseEntity<>(service.deleteCustomization(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomizationResponseDTO> getCustomization(@PathVariable Long id) {
        return new ResponseEntity<>(service.findCustomization(id), HttpStatus.OK);
    }

    @PostMapping("/mock")
    public ResponseEntity<Void> postAllCustomization(@RequestBody List<CustomizationRequestDTO> customizationRequestDTOS) {
        service.mockarCustomization(customizationRequestDTOS);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
