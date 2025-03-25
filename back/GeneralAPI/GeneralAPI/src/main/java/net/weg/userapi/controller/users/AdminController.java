package net.weg.userapi.controller.users;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.userapi.model.dto.request.users.AdminRequestDTO;
import net.weg.userapi.model.dto.response.users.AdminResponseDTO;
import net.weg.userapi.model.dto.response.users.StudentResponseDTO;
import net.weg.userapi.model.entity.users.Admin;
import net.weg.userapi.model.entity.users.Student;
import net.weg.userapi.service.users.AdminService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
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

    @GetMapping
    public Page<AdminResponseDTO> searchAdmin (
            @And({
                    @Spec(path = "id", spec = Equal.class),
                    @Spec(path = "name", spec = Like.class),
                    @Spec(path = "email", spec = Like.class),
                    @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class),
                    @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)
            }) Specification<Admin> spec, Pageable pageable) {

        return service.findAdminSpec(spec, pageable);
    }

    @PostMapping
    public ResponseEntity<AdminResponseDTO> postAdmin(@RequestBody @Validated AdminRequestDTO adminRequestDTO) {
        return new ResponseEntity<>(service.createAdmin(adminRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminResponseDTO> putAdmin(@RequestBody @Validated AdminRequestDTO adminRequestDTO, @PathVariable Long id) {
        return new ResponseEntity<>(service.updateAdmin(adminRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AdminResponseDTO> deleteAdmin(@PathVariable Long id) {
        return new ResponseEntity<>(service.deleteAdmin(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminResponseDTO> getAdmin(@PathVariable Long id) {
        return new ResponseEntity<>(service.findAdmin(id), HttpStatus.OK);
    }

    @PostMapping("/mock")
    public ResponseEntity<Void> postAllAdmin(@RequestBody List<AdminRequestDTO> adminRequestDTOS) {
        service.mockarAdmin(adminRequestDTOS);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
