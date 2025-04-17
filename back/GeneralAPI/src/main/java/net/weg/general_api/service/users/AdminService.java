package net.weg.general_api.service.users;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.dto.request.users.UserRequestDTO;
import net.weg.general_api.model.dto.response.users.UserResponseDTO;
import net.weg.general_api.model.entity.users.Admin;
import net.weg.general_api.model.enums.RoleENUM;
import net.weg.general_api.repository.AdminRepository;
import net.weg.general_api.service.kafka.KafkaEventSender;
import net.weg.general_api.service.security.EmailApiClient;
import net.weg.general_api.service.security.EmailService;
import net.weg.general_api.service.security.PasswordGeneratorService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminService {

    private AdminRepository repository;
    private CustomizationService customizationService;
    private UserAuthenticationService userAuthenticationService;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;
    private final EmailService emailService;

    public Page<UserResponseDTO> findAdminSpec(Specification<Admin> spec, Pageable pageable) {
        Page<Admin> admins = repository.getAllByEnabledIsTrue(spec, pageable);
        return admins.map(admin -> modelMapper.map(admin, UserResponseDTO.class));
    }

    public UserResponseDTO createAdmin(UserRequestDTO userRequestDTO) {
        Admin admin = modelMapper.map(userRequestDTO, Admin.class);
        String randomPassword = PasswordGeneratorService.generateSimpleAlphanumericPassword();

        admin.setUserAuthentication(
                userAuthenticationService.saveUserAuthentication(userRequestDTO.getEmail(), randomPassword, RoleENUM.ADMIN)
        );

        Admin adminSaved = repository.save(admin);

        emailService.sendPasswordEmailAsync(
                userRequestDTO.getEmail(),
                userRequestDTO.getName(),
                randomPassword
        );

        kafkaEventSender.sendEvent(adminSaved, "POST", "New admin created");
        adminSaved.setCustomization(customizationService.setDefault(adminSaved));

        return modelMapper.map(adminSaved, UserResponseDTO.class);
    }

    public UserResponseDTO findAdmin(Long id) {
        Admin adminFound = findAdminEntity(id);

        return modelMapper.map(adminFound, UserResponseDTO.class);
    }

    public Admin findAdminEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException("Admin user not found"));
    }

    public UserResponseDTO updateAdmin(UserRequestDTO userRequestDTO, Long id) {
        Admin admin = findAdminEntity(id);
        modelMapper.map(userRequestDTO, admin);
        Admin updatedAdmin = repository.save(admin);
        kafkaEventSender.sendEvent(updatedAdmin, "PUT", "Admin updated");
        return modelMapper.map(updatedAdmin, UserResponseDTO.class);
    }

    public UserResponseDTO disableAdmin(Long id) {
        Admin admin = findAdminEntity(id);
        admin.getUserAuthentication().setEnabled(false);
        repository.save(admin);
        kafkaEventSender.sendEvent(admin, "DELETE", "Admin deleted");
        return modelMapper.map(admin, UserResponseDTO.class);
    }

}
