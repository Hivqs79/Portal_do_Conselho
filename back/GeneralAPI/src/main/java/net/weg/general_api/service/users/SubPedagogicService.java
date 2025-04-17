package net.weg.general_api.service.users;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.dto.request.users.UserRequestDTO;
import net.weg.general_api.model.dto.response.users.UserResponseDTO;
import net.weg.general_api.model.entity.users.SubPedagogic;
import net.weg.general_api.model.enums.RoleENUM;
import net.weg.general_api.repository.SubPedagogicRepository;
import net.weg.general_api.service.kafka.KafkaEventSender;
import net.weg.general_api.service.security.EmailApiClient;
import net.weg.general_api.service.security.EmailService;
import net.weg.general_api.service.security.PasswordGeneratorService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SubPedagogicService {

    private SubPedagogicRepository repository;
    private CustomizationService customizationService;
    private UserAuthenticationService userAuthenticationService;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;
    private final EmailService emailService;

    public Page<UserResponseDTO> findSubPedagogicSpec(Specification<SubPedagogic> spec, Pageable pageable) {
        Page<SubPedagogic> subPedagogics = repository.getAllByEnabledIsTrue(spec, pageable);
        return subPedagogics.map(subPedagogic -> modelMapper.map(subPedagogic, UserResponseDTO.class));
    }

    public UserResponseDTO createSubPedagogic(UserRequestDTO subPedagogicRequestDTO) {
        SubPedagogic subPedagogic = modelMapper.map(subPedagogicRequestDTO, SubPedagogic.class);

        String randomPassword = PasswordGeneratorService.generateSimpleAlphanumericPassword();

        subPedagogic.setUserAuthentication(
                userAuthenticationService.saveUserAuthentication(subPedagogicRequestDTO.getEmail(), randomPassword, RoleENUM.SUBPEDAGOGIC)
        );

        SubPedagogic subPedagogicSaved = repository.save(subPedagogic);

        emailService.sendPasswordEmailAsync(
                subPedagogicRequestDTO.getEmail(),
                subPedagogicRequestDTO.getName(), // Assumindo que existe um campo name no DTO
                randomPassword
        );

        kafkaEventSender.sendEvent(subPedagogicSaved, "POST", "New subPedagogic created");
        subPedagogicSaved.setCustomization(customizationService.setDefault(subPedagogicSaved));

        return modelMapper.map(subPedagogicSaved, UserResponseDTO.class);
    }

    public UserResponseDTO findSubPedagogic(Long id) {
        SubPedagogic subPedagogicFound = findSubPedagogicEntity(id);

        return modelMapper.map(subPedagogicFound, UserResponseDTO.class);
    }

    public SubPedagogic findSubPedagogicEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException("SubPedagogic user not found"));
    }

    public UserResponseDTO updateSubPedagogic(UserRequestDTO subPedagogicRequestDTO, Long id) {
        SubPedagogic subPedagogic = findSubPedagogicEntity(id);
        modelMapper.map(subPedagogicRequestDTO, subPedagogic);
        SubPedagogic updatedSubPedagogic = repository.save(subPedagogic);
        kafkaEventSender.sendEvent(updatedSubPedagogic, "PUT", "SubPedagogic updated");
        return modelMapper.map(updatedSubPedagogic, UserResponseDTO.class);
    }

    public UserResponseDTO disableSubPedagogic(Long id) {
        SubPedagogic subPedagogic = findSubPedagogicEntity(id);
        subPedagogic.getUserAuthentication().setEnabled(false);
        repository.save(subPedagogic);
        kafkaEventSender.sendEvent(subPedagogic, "DELETE", "SubPedagogic deleted");
        return modelMapper.map(subPedagogic, UserResponseDTO.class);
    }

}
