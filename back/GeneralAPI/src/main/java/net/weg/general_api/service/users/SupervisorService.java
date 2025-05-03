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
import net.weg.general_api.model.entity.users.Supervisor;
import net.weg.general_api.model.enums.RoleENUM;
import net.weg.general_api.repository.SupervisorRepository;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
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
public class SupervisorService {

    private SupervisorRepository repository;
    private CustomizationService customizationService;
    private UserAuthenticationService userAuthenticationService;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;
    private final EmailService emailService;

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

        emailService.sendPasswordEmailAsync(
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
