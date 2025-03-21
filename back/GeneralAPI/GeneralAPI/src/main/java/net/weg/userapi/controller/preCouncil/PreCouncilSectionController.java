package net.weg.userapi.controller.preCouncil;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.preCouncil.PreCouncilRequestDTO;
import net.weg.userapi.model.dto.request.preCouncil.PreCouncilSectionRequestDTO;
import net.weg.userapi.model.dto.response.preCouncil.PreCouncilSectionResponseDTO;
import net.weg.userapi.model.entity.preCouncil.PreCouncilSection;
import net.weg.userapi.service.preCouncil.PreCouncilSectionService;
import net.weg.userapi.service.preCouncil.PreCouncilService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pre-council/section")
@AllArgsConstructor
public class PreCouncilSectionController {

    private PreCouncilSectionService service;

    @PostMapping
    public ResponseEntity<PreCouncilSectionResponseDTO> postPreCouncil(@RequestBody @Validated PreCouncilSectionRequestDTO preCouncilRequestDTO) {
        return new ResponseEntity<>(service.createPreCouncilSection(preCouncilRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PreCouncilSectionResponseDTO> putPreCouncil(@RequestBody @Validated PreCouncilSectionRequestDTO preCouncilRequestDTO, @PathVariable Integer id) {
        return new ResponseEntity<>(service.updatePreCouncilSection(preCouncilRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PreCouncilSectionResponseDTO> deletePreCouncil(@PathVariable Integer id) {
        return new ResponseEntity<>(service.deletePreCouncilSection(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PreCouncilSectionResponseDTO> getPreCouncil(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findPreCouncilSection(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<PreCouncilSectionResponseDTO>> getAllPreCouncil(Pageable pageable) {
        return new ResponseEntity<>(service.pagePreCouncilSection(pageable), HttpStatus.OK);
    }

}
