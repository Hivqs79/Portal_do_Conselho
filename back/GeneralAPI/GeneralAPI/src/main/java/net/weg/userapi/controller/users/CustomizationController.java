package net.weg.userapi.controller.users;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.users.CustomizationRequestDTO;
import net.weg.userapi.model.dto.response.users.CustomizationResponseDTO;
import net.weg.userapi.service.users.CustomizationService;
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
