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

    @PutMapping("/{user_id}")
    public ResponseEntity<CustomizationResponseDTO> putCustomization(@RequestBody @Validated CustomizationRequestDTO customizationRequestDTO, @PathVariable Long user_id) {
        return new ResponseEntity<>(service.updateCustomization(customizationRequestDTO, user_id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomizationResponseDTO> getCustomization(@PathVariable Long id) {
        return new ResponseEntity<>(service.findCustomization(id), HttpStatus.OK);
    }
    
}
