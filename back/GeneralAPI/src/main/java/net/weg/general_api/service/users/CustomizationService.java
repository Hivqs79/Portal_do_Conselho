/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.weg.general_api.service.users;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.CustomizationNotFoundException;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.dto.request.users.CustomizationRequestDTO;
import net.weg.general_api.model.dto.response.users.CustomizationResponseDTO;
import net.weg.general_api.model.entity.users.Customization;
import net.weg.general_api.model.entity.users.User;
import net.weg.general_api.model.enums.*;
import net.weg.general_api.repository.CustomizationRepository;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomizationService {

    private CustomizationRepository repository;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;


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
        return repository.findById(id).orElseThrow(() -> new CustomizationNotFoundException("Customization not found"));
    }

    public CustomizationResponseDTO updateCustomization(CustomizationRequestDTO customizationRequestDTO, Long user_id) {
        Customization customization = repository.findByUser_Id(user_id).orElseThrow(() -> new UserNotFoundException("User not found"));
        modelMapper.map(customizationRequestDTO, customization);
        Customization updatedCustomization = repository.save(customization);
        kafkaEventSender.sendEvent(updatedCustomization, "PUT", "Customization updated");
        return modelMapper.map(updatedCustomization, CustomizationResponseDTO.class);
    }

}
