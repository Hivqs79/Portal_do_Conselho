package net.weg.general_api.service.users;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.dto.request.users.AdminRequestDTO;
import net.weg.general_api.model.dto.response.users.AdminResponseDTO;
import net.weg.general_api.model.entity.users.Admin;
import net.weg.general_api.repository.AdminRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminService {

    private AdminRepository repository;
    private CustomizationService customizationService;
    private ModelMapper modelMapper;

    public Page<AdminResponseDTO> findAdminSpec(Specification<Admin> spec, Pageable pageable) {
        Page<Admin> admins = repository.getAllByEnabledIsTrue(spec, pageable);
        return admins.map(admin -> modelMapper.map(admin, AdminResponseDTO.class));
    }

    public AdminResponseDTO createAdmin(AdminRequestDTO adminRequestDTO) {
        Admin admin = modelMapper.map(adminRequestDTO, Admin.class);

        Admin adminSaved = repository.save(admin);
        adminSaved.setCustomization(customizationService.setDefault(adminSaved));

        return modelMapper.map(adminSaved, AdminResponseDTO.class);
    }

    public AdminResponseDTO findAdmin(Long id) {
        Admin adminFound = findAdminEntity(id);

        return modelMapper.map(adminFound, AdminResponseDTO.class);
    }

    public Admin findAdminEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException("Admin user not found"));
    }

    public AdminResponseDTO updateAdmin(AdminRequestDTO adminRequestDTO, Long id) {
        Admin admin = findAdminEntity(id);
        modelMapper.map(adminRequestDTO, admin);
        Admin updatedAdmin = repository.save(admin);
        return modelMapper.map(updatedAdmin, AdminResponseDTO.class);
    }

    public AdminResponseDTO disableAdmin(Long id) {
        Admin admin = findAdminEntity(id);
        admin.setEnabled(false);
        repository.save(admin);
        return modelMapper.map(admin, AdminResponseDTO.class);
    }

}
