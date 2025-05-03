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
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.dto.request.users.UserRequestDTO;
import net.weg.general_api.model.dto.response.users.UserResponseDTO;
import net.weg.general_api.model.entity.users.Pedagogic;
import net.weg.general_api.model.enums.RoleENUM;
import net.weg.general_api.repository.PedagogicRepository;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import net.weg.general_api.service.security.EmailApiClient;
import net.weg.general_api.service.security.EmailService;
import net.weg.general_api.service.security.PasswordGeneratorService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PedagogicService {

    private PedagogicRepository repository;
    private CustomizationService customizationService;
    private UserAuthenticationService userAuthenticationService;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;
    private final EmailService emailService;

    public Page<UserResponseDTO> findPedagogicSpec(Specification<Pedagogic> spec, Pageable pageable) {
        Page<Pedagogic> pedagogics = repository.getAllByEnabledIsTrue(spec, pageable);
        return pedagogics.map(pedagogic -> modelMapper.map(pedagogic, UserResponseDTO.class));
    }


    public List<Pedagogic> findAllPedagogicEntity() {
        return repository.findAll();
    }

    public UserResponseDTO createPedagogic(UserRequestDTO userRequestDTO) {
        Pedagogic pedagogic = modelMapper.map(userRequestDTO, Pedagogic.class);
        String randomPassword = PasswordGeneratorService.generateSimpleAlphanumericPassword();

        pedagogic.setUserAuthentication(
                userAuthenticationService.saveUserAuthentication(userRequestDTO.getEmail(), randomPassword, RoleENUM.PEDAGOGIC)
        );

        Pedagogic pedagogicSaved = repository.save(pedagogic);

        emailService.sendPasswordEmailAsync(
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
