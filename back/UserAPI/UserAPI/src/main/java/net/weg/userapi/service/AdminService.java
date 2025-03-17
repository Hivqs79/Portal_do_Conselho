package net.weg.userapi.service;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.UserNotFoundException;
import net.weg.userapi.model.dto.request.users.AdminRequestDTO;
import net.weg.userapi.model.dto.response.users.AdminResponseDTO;
import net.weg.userapi.model.entity.users.Admin;
import net.weg.userapi.repository.AdminRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AdminService {

    private AdminRepository repository;
    private ModelMapper modelMapper;

    public AdminResponseDTO createAdmin(AdminRequestDTO adminRequestDTO) {
        Admin admin = modelMapper.map(adminRequestDTO, Admin.class);
        Admin adminSaved = repository.save(admin);

        return modelMapper.map(adminSaved, AdminResponseDTO.class);
    }

    public AdminResponseDTO findAdmin(Integer id) {
        Admin adminFound = findAdminEntity(id);

        return modelMapper.map(adminFound, AdminResponseDTO.class);
    }

    public Admin findAdminEntity(Integer id) {
        return repository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public Page<AdminResponseDTO> pageAdmin(Pageable pageable) {
        Page<Admin> adminPage = repository.findAll(pageable);

        return adminPage.map(admin -> modelMapper.map(admin, AdminResponseDTO.class));
    }

    public AdminResponseDTO updateAdmin(AdminRequestDTO adminRequestDTO, Integer id) {
        Admin admin = findAdminEntity(id);
        modelMapper.map(adminRequestDTO, admin);
        Admin updatedAdmin = repository.save(admin);
        return modelMapper.map(updatedAdmin, AdminResponseDTO.class);
    }

    public AdminResponseDTO deleteAdmin(Integer id) {
        Admin admin = findAdminEntity(id);
        repository.delete(admin);
        return modelMapper.map(admin, AdminResponseDTO.class);
    }

    public void mockarAdmin (List<AdminRequestDTO> adminRequestDTOS) {
        List<Admin> admins = adminRequestDTOS.stream().map(adminRequestDTO -> modelMapper.map(adminRequestDTO, Admin.class)).collect(Collectors.toList());
        repository.saveAll(admins);
    }
}
