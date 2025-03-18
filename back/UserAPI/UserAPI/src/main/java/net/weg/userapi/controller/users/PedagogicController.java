package net.weg.userapi.controller.users;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.users.PedagogicRequestDTO;
import net.weg.userapi.model.dto.response.users.PedagogicResponseDTO;
import net.weg.userapi.service.users.PedagogicService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @PostMapping
    public ResponseEntity<PedagogicResponseDTO> postPedagogic(@RequestBody @Validated PedagogicRequestDTO pedagogicRequestDTO) {
        return new ResponseEntity<>(service.createPedagogic(pedagogicRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PedagogicResponseDTO> putPedagogic(@RequestBody @Validated PedagogicRequestDTO pedagogicRequestDTO, @PathVariable Integer id) {
        return new ResponseEntity<>(service.updatePedagogic(pedagogicRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<PedagogicResponseDTO> deletePedagogic(@PathVariable Integer id) {
        return new ResponseEntity<>(service.deletePedagogic(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PedagogicResponseDTO> getPedagogic(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findPedagogic(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<PedagogicResponseDTO>> getAllPedagogic(Pageable pageable) {
        return new ResponseEntity<>(service.pagePedagogic(pageable), HttpStatus.OK);
    }

    @PostMapping("/mock")
    public ResponseEntity<Void> postAllPedagogic(@RequestBody List<PedagogicRequestDTO> pedagogicRequestDTOS) {
        service.mockarPedagogic(pedagogicRequestDTOS);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
