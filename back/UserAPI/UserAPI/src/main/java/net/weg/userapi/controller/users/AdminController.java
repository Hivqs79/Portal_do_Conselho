package net.weg.userapi.controller.users;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.users.AdminRequestDTO;
import net.weg.userapi.model.dto.response.users.AdminResponseDTO;
import net.weg.userapi.service.users.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {

    private AdminService service;

    @PostMapping
    public ResponseEntity<AdminResponseDTO> postAdmin(@RequestBody @Validated AdminRequestDTO adminRequestDTO) {
        return new ResponseEntity<>(service.createAdmin(adminRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminResponseDTO> putAdmin(@RequestBody @Validated AdminRequestDTO adminRequestDTO, @PathVariable Integer id) {
        return new ResponseEntity<>(service.updateAdmin(adminRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AdminResponseDTO> deleteAdmin(@PathVariable Integer id) {
        return new ResponseEntity<>(service.deleteAdmin(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminResponseDTO> getAdmin(@PathVariable Integer id) {
        return new ResponseEntity<>(service.findAdmin(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Page<AdminResponseDTO>> getAllAdmin(Pageable pageable) {
        return new ResponseEntity<>(service.pageAdmin(pageable), HttpStatus.OK);
    }

    @PostMapping("/mock")
    public ResponseEntity<Void> postAllAdmin(@RequestBody List<AdminRequestDTO> adminRequestDTOS) {
        service.mockarAdmin(adminRequestDTOS);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
