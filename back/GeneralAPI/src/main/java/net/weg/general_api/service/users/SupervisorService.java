package net.weg.general_api.service.users;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.dto.request.users.UserRequestDTO;
import net.weg.general_api.model.dto.response.users.UserResponseDTO;
import net.weg.general_api.model.entity.users.Supervisor;
import net.weg.general_api.model.enums.RoleENUM;
import net.weg.general_api.repository.SupervisorRepository;
import net.weg.general_api.service.kafka.KafkaEventSender;
import net.weg.general_api.service.security.EmailApiClient;
import net.weg.general_api.service.security.PasswordGeneratorService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SupervisorService {

    private SupervisorRepository repository;
    private CustomizationService customizationService;
    private UserAuthenticationService userAuthenticationService;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;
    private final EmailApiClient emailApiClient;

    public Page<UserResponseDTO> findSupervisorSpec(Specification<Supervisor> spec, Pageable pageable) {
        Page<Supervisor> supervisors = repository.getAllByEnabledIsTrue(spec, pageable);
        return supervisors.map(supervisor -> modelMapper.map(supervisor, UserResponseDTO.class));
    }

    public UserResponseDTO createSupervisor(UserRequestDTO supervisorRequestDTO) {
        Supervisor supervisor = modelMapper.map(supervisorRequestDTO, Supervisor.class);

        String randomPassword = PasswordGeneratorService.generateSimpleAlphanumericPassword();

        supervisor.setUserAuthentication(
                userAuthenticationService.saveUserAuthentication(supervisorRequestDTO.getEmail(), randomPassword, RoleENUM.SUPERVISOR)
        );

        Supervisor supervisorSaved = repository.save(supervisor);

        emailApiClient.sendPasswordEmail(
                supervisorRequestDTO.getEmail(),
                supervisorRequestDTO.getName(), // Assumindo que existe um campo name no DTO
                randomPassword
        );

        kafkaEventSender.sendEvent(supervisorSaved, "POST", "New supervisor created");
        supervisorSaved.setCustomization(customizationService.setDefault(supervisorSaved));

        return modelMapper.map(supervisorSaved, UserResponseDTO.class);
    }

    public UserResponseDTO findSupervisor(Long id) {
        Supervisor supervisorFound = findSupervisorEntity(id);

        return modelMapper.map(supervisorFound, UserResponseDTO.class);
    }

    public Supervisor findSupervisorEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException("Supervisor user not found"));
    }

    public UserResponseDTO updateSupervisor(UserRequestDTO supervisorRequestDTO, Long id) {
        Supervisor supervisor = findSupervisorEntity(id);
        modelMapper.map(supervisorRequestDTO, supervisor);
        Supervisor updatedSupervisor = repository.save(supervisor);
        kafkaEventSender.sendEvent(updatedSupervisor, "PUT", "Supervisor updated");
        return modelMapper.map(updatedSupervisor, UserResponseDTO.class);
    }

    public UserResponseDTO disableSupervisor(Long id) {
        Supervisor supervisor = findSupervisorEntity(id);
        supervisor.getUserAuthentication().setEnabled(false);
        repository.save(supervisor);
        kafkaEventSender.sendEvent(supervisor, "DELETE", "Supervisor deleted");
        return modelMapper.map(supervisor, UserResponseDTO.class);
    }

}
