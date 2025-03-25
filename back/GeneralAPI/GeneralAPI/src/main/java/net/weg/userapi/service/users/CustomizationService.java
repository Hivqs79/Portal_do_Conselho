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
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomizationService {

    private CustomizationRepository repository;
    private ModelMapper modelMapper;


    public Customization setDefault(User user) {
        return repository.save(
                Customization.builder()
                        .modeTheme(ModeThemeENUM.LIGHT)
                        .pallete(PalleteENUM.BLUE)
                        .textFont(TextFont.POPPINS)
                        .titleFont(TitleFont.LORA)
                        .fontSize(FontSizeENUM.FONT1)
                        .user(user)
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

    public CustomizationResponseDTO updateCustomization(CustomizationRequestDTO customizationRequestDTO, Long user_id) {
        Customization customization = repository.findByUser_Id(user_id).orElseThrow(() -> new UserNotFoundException("User not found"));
        modelMapper.map(customizationRequestDTO, customization);
        Customization updatedCustomization = repository.save(customization);
        return modelMapper.map(updatedCustomization, CustomizationResponseDTO.class);
    }

}
