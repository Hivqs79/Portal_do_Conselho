package net.weg.userapi.service.users;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.UserNotFoundException;
import net.weg.userapi.model.dto.request.users.CustomizationRequestDTO;
import net.weg.userapi.model.dto.response.users.CustomizationResponseDTO;
import net.weg.userapi.model.entity.users.Customization;
import net.weg.userapi.model.entity.users.User;
import net.weg.userapi.model.enums.*;
import net.weg.userapi.repository.CustomizationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomizationService {

    private CustomizationRepository repository;
    private ModelMapper modelMapper;

    public Page<CustomizationResponseDTO> findCustomizationSpec(Specification<Customization> spec, Pageable pageable) {
        Page<Customization> customizations = repository.findAll(spec, pageable);
        return customizations.map(customization -> modelMapper.map(customization, CustomizationResponseDTO.class));
    }

    public CustomizationResponseDTO createCustomization(CustomizationRequestDTO customizationRequestDTO) {
        Customization customization = modelMapper.map(customizationRequestDTO, Customization.class);
        Customization customizationSaved = repository.save(customization);
        return modelMapper.map(customizationSaved, CustomizationResponseDTO.class);
    }

    public void setDefault(User user) {
        repository.save(
                Customization.builder()
                        .build()
        );
    }

    public CustomizationResponseDTO findCustomization(Long id) {
        Customization customizationFound = findCustomizationEntity(id);

        return modelMapper.map(customizationFound, CustomizationResponseDTO.class);
    }

    public Customization findCustomizationEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Customization not found"));
    }

    public Page<CustomizationResponseDTO> pageCustomization(Pageable pageable) {
        Page<Customization> customizationPage = repository.findAll(pageable);

        return customizationPage.map(customization -> modelMapper.map(customization, CustomizationResponseDTO.class));
    }

    public CustomizationResponseDTO updateCustomization(CustomizationRequestDTO customizationRequestDTO, Long id) {
        Customization customization = findCustomizationEntity(id);
        modelMapper.map(customizationRequestDTO, customization);
        Customization updatedCustomization = repository.save(customization);
        return modelMapper.map(updatedCustomization, CustomizationResponseDTO.class);
    }

    public CustomizationResponseDTO deleteCustomization(Long id) {
        Customization customization = findCustomizationEntity(id);
        CustomizationResponseDTO customizationResponseDTO = modelMapper.map(customization, CustomizationResponseDTO.class);
        repository.delete(customization);
        return customizationResponseDTO;
    }

    public void mockarCustomization(List<CustomizationRequestDTO> customizationRequestDTOS) {
        List<Customization> customizations = customizationRequestDTOS.stream().map(customizationRequestDTO -> modelMapper.map(customizationRequestDTO, Customization.class)).collect(Collectors.toList());
        repository.saveAll(customizations);
    }

}
