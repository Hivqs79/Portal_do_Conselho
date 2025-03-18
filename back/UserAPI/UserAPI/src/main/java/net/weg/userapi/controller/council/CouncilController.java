package net.weg.userapi.controller.council;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.council.CouncilRequestDTO;
import net.weg.userapi.model.dto.response.council.CouncilResponseDTO;
import net.weg.userapi.service.council.CouncilService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/council")
@AllArgsConstructor
public class CouncilController {

    private CouncilService service;

    @PostMapping
    public ResponseEntity<CouncilResponseDTO> postCouncil(@RequestBody @Validated CouncilRequestDTO councilRequestDTO) {
        return new ResponseEntity<>(service.createCouncil(councilRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CouncilResponseDTO> putCouncil(@RequestBody @Validated CouncilRequestDTO councilRequestDTO, @PathVariable Integer id) {
        return new ResponseEntity<>(service.updateCouncil(councilRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CouncilResponseDTO> deleteCouncil(@PathVariable Integer id) {
        return new ResponseEntity<>(service.deleteCouncil(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CouncilResponseDTO> getCouncil(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findCouncil(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<CouncilResponseDTO>> getAllCouncil(Pageable pageable) {
        return new ResponseEntity<>(service.pageCouncil(pageable), HttpStatus.OK);
    }
}
