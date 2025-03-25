package net.weg.userapi.service.users;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.UserNotFoundException;
import net.weg.userapi.model.dto.request.users.AdminRequestDTO;
import net.weg.userapi.model.dto.request.users.CustomizationRequestDTO;
import net.weg.userapi.model.dto.response.feedback.FeedbackUserResponseDTO;
import net.weg.userapi.model.dto.response.users.AdminResponseDTO;
import net.weg.userapi.model.entity.feedback.FeedbackUser;
import net.weg.userapi.model.entity.users.Admin;
import net.weg.userapi.model.enums.*;
import net.weg.userapi.repository.AdminRepository;
import net.weg.userapi.service.kafka.KafkaProducerService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AdminService {

    private AdminRepository repository;
    private CustomizationService customizationService;
    private ModelMapper modelMapper;

    public Page<AdminResponseDTO> findAdminSpec(Specification<Admin> spec, Pageable pageable) {
        Page<Admin> admins = repository.findAll(spec, pageable);
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

    public Page<AdminResponseDTO> pageAdmin(Pageable pageable) {
        Page<Admin> adminPage = repository.findAll(pageable);

        return adminPage.map(admin -> modelMapper.map(admin, AdminResponseDTO.class));
    }

    public AdminResponseDTO updateAdmin(AdminRequestDTO adminRequestDTO, Long id) {
        Admin admin = findAdminEntity(id);
        modelMapper.map(adminRequestDTO, admin);
        Admin updatedAdmin = repository.save(admin);
        return modelMapper.map(updatedAdmin, AdminResponseDTO.class);
    }

    public AdminResponseDTO deleteAdmin(Long id) {
        Admin admin = findAdminEntity(id);
        AdminResponseDTO adminResponseDTO = modelMapper.map(admin, AdminResponseDTO.class);
        repository.delete(admin);
        return adminResponseDTO;
    }

    public void mockarAdmin (List<AdminRequestDTO> adminRequestDTOS) {
        List<Admin> admins = adminRequestDTOS.stream().map(adminRequestDTO -> modelMapper.map(adminRequestDTO, Admin.class)).collect(Collectors.toList());
        repository.saveAll(admins);
    }
}
