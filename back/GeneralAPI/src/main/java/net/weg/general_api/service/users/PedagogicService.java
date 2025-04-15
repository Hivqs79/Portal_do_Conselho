package net.weg.general_api.service.users;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.dto.request.users.UserRequestDTO;
import net.weg.general_api.model.dto.response.users.UserResponseDTO;
import net.weg.general_api.model.entity.users.Pedagogic;
import net.weg.general_api.model.enums.RoleENUM;
import net.weg.general_api.repository.PedagogicRepository;
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
public class PedagogicService {

    private PedagogicRepository repository;
    private CustomizationService customizationService;
    private UserAuthenticationService userAuthenticationService;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;
    private final EmailApiClient emailApiClient;

    public Page<UserResponseDTO> findPedagogicSpec(Specification<Pedagogic> spec, Pageable pageable) {
        Page<Pedagogic> pedagogics = repository.getAllByEnabledIsTrue(spec, pageable);
        return pedagogics.map(pedagogic -> modelMapper.map(pedagogic, UserResponseDTO.class));
    }

    public UserResponseDTO createPedagogic(UserRequestDTO userRequestDTO) {
        Pedagogic pedagogic = modelMapper.map(userRequestDTO, Pedagogic.class);

        String randomPassword = PasswordGeneratorService.generateSimpleAlphanumericPassword();

        pedagogic.setUserAuthentication(
                userAuthenticationService.saveUserAuthentication(userRequestDTO.getEmail(), randomPassword, RoleENUM.PEDAGOGIC)
        );

        Pedagogic pedagogicSaved = repository.save(pedagogic);

        emailApiClient.sendPasswordEmail(
                userRequestDTO.getEmail(),
                userRequestDTO.getName(), // Assumindo que existe um campo name no DTO
                randomPassword
        );

        kafkaEventSender.sendEvent(pedagogicSaved, "POST", "Pedagogic created");
        pedagogicSaved.setCustomization(customizationService.setDefault(pedagogicSaved));

        return modelMapper.map(pedagogicSaved, UserResponseDTO.class);
    }

    public UserResponseDTO findPedagogic(Long id) {
        Pedagogic pedagogicFound = findPedagogicEntity(id);

        return modelMapper.map(pedagogicFound, UserResponseDTO.class);
    }

    public Pedagogic findPedagogicEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException("Pedagogic user not found"));
    }

    public UserResponseDTO updatePedagogic(UserRequestDTO userRequestDTO, Long id) {
        Pedagogic pedagogic = findPedagogicEntity(id);
        modelMapper.map(userRequestDTO, pedagogic);
        Pedagogic updatedPedagogic = repository.save(pedagogic);
        kafkaEventSender.sendEvent(updatedPedagogic, "PUT", "Pedagogic updated");
        return modelMapper.map(updatedPedagogic, UserResponseDTO.class);
    }

    public UserResponseDTO disablePedagogic(Long id) {
        Pedagogic pedagogic = findPedagogicEntity(id);
        pedagogic.getUserAuthentication().setEnabled(false);
        repository.save(pedagogic);
        kafkaEventSender.sendEvent(pedagogic, "DELETE", "Pedagogic disabled");
        return modelMapper.map(pedagogic, UserResponseDTO.class);
    }

}
