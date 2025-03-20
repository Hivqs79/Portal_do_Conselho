package net.weg.userapi.controller.preCouncil;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.preCouncil.PreCouncilRequestDTO;
import net.weg.userapi.model.dto.response.preCouncil.PreCouncilResponseDTO;
import net.weg.userapi.service.preCouncil.PreCouncilService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pre-council")
@AllArgsConstructor
public class PreCouncilController {

    private PreCouncilService service;

    @PostMapping
    public ResponseEntity<PreCouncilResponseDTO> postPreCouncil(@RequestBody @Validated PreCouncilRequestDTO preCouncilRequestDTO) {
        return new ResponseEntity<>(service.createPreCouncil(preCouncilRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PreCouncilResponseDTO> putPreCouncil(@RequestBody @Validated PreCouncilRequestDTO preCouncilRequestDTO, @PathVariable Integer id) {
        return new ResponseEntity<>(service.updatePreCouncil(preCouncilRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PreCouncilResponseDTO> deletePreCouncil(@PathVariable Integer id) {
        return new ResponseEntity<>(service.deletePreCouncil(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PreCouncilResponseDTO> getPreCouncil(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findPreCouncil(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<PreCouncilResponseDTO>> getAllPreCouncil(Pageable pageable) {
        return new ResponseEntity<>(service.pagePreCouncil(pageable), HttpStatus.OK);
    }
    
}
