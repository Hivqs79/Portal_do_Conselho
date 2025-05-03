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

package net.weg.general_api.service.council;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.CouncilAlreadyHappeningException;
import net.weg.general_api.exception.exceptions.CouncilNotFoundException;
import net.weg.general_api.model.dto.request.council.CouncilRequestDTO;
import net.weg.general_api.model.dto.response.council.CouncilResponseDTO;
import net.weg.general_api.model.entity.annotation.Annotation;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.repository.CouncilRepository;
import net.weg.general_api.service.classes.ClassService;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import net.weg.general_api.service.security.EmailService;
import net.weg.general_api.service.users.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CouncilService {

    private final CouncilRepository repository;
    private final ModelMapper modelMapper;
    private final ClassService classService;
    private final TeacherService teacherService;
    private final KafkaEventSender kafkaEventSender;
    private final EmailService emailService;

    public Page<CouncilResponseDTO> findCouncilSpec(Specification<Council> spec, Pageable pageable) {
        Page<Council> councils = repository.getAllByEnabledIsTrue(spec, pageable);
        return councils.map(council -> modelMapper.map(council, CouncilResponseDTO.class));
    }

    public CouncilResponseDTO createCouncil(CouncilRequestDTO councilRequestDTO) {
        Council council = modelMapper.map(councilRequestDTO, Council.class);

        council.setAClass(classService.findClassEntity(councilRequestDTO.getClass_id())); //SETAR CLASSE

        List<Teacher> teachers = teacherService.getTeachersByIdList(councilRequestDTO.getTeachers_id());
        council.setTeachers(teachers); //SETAR PROFESSORES

        Council councilSaved = repository.save(council);

        teachers.forEach(teacher -> {
            emailService.sendCouncilInfoEmailAsync(
                    teacher.getUserAuthentication().getUsername(),
                    teacher.getName(),
                    council.getAClass().getName(),
                    council.getStartDateTime()
            );
        });

        kafkaEventSender.sendEvent(councilSaved, "POST", "Council created");

        return modelMapper.map(councilSaved, CouncilResponseDTO.class);
    }

    public CouncilResponseDTO findCouncil(Long id) {
        Council council = findCouncilEntity(id);

        return modelMapper.map(council, CouncilResponseDTO.class);
    }

    public Council findCouncilEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new CouncilNotFoundException("Council not found"));
    }

    public Page<CouncilResponseDTO> pageCouncil(Pageable pageable) {
        Page<Council> council = repository.findAll(pageable);

        return council.map(annotation -> modelMapper.map(annotation, CouncilResponseDTO.class));
    }

    public CouncilResponseDTO updateCouncil(CouncilRequestDTO councilRequestDTO, Long id) {
        Council council = findCouncilEntity(id);
        modelMapper.map(councilRequestDTO, council);

        council.setAClass(classService.findClassEntity(councilRequestDTO.getClass_id())); //SETAR CLASSE
        council.setTeachers(teacherService.getTeachersByIdList(councilRequestDTO.getTeachers_id())); //SETAR PROFESSOR

        Council updatedCouncil = repository.save(council);
        kafkaEventSender.sendEvent(updatedCouncil, "PUT", "Council updated");

        return modelMapper.map(updatedCouncil, CouncilResponseDTO.class);
    }

    public CouncilResponseDTO disableCouncil(Long id) {
        Council council = findCouncilEntity(id);
        council.setEnabled(false);
        repository.save(council);
        kafkaEventSender.sendEvent(council, "DELETE", "Council disabled");

        return modelMapper.map(council, CouncilResponseDTO.class);
    }

    public List<Annotation> getAllAnnotations(Long id) {
        Council council = findCouncilEntity(id);

        return council.getAnnotations();
    }

    public CouncilResponseDTO modifyCouncilFinished(Long id) {
        Council council = findCouncilEntity(id);
        if (council.isFinished()) {
            council.setFinished(false);
            kafkaEventSender.sendEvent(council, "PATCH", "Council status not finished");
        } else {
            council.setFinished(true);
            kafkaEventSender.sendEvent(council, "PATCH", "Council status is finished");
        }
        repository.save(council);
        return modelMapper.map(council, CouncilResponseDTO.class);
    }

    public CouncilResponseDTO modifyCouncilStatus(Long id) {
        Council council = findCouncilEntity(id);
        if (council.isHappening()) {
            council.setHappening(false);
            kafkaEventSender.sendEvent(council, "PATCH", "Council status not happening");
        } else {

            if (repository.existsCouncilByisHappeningIsTrue()) {
                throw new CouncilAlreadyHappeningException("Ja existe um conselho rodando!");
            }

            council.setHappening(true);
            kafkaEventSender.sendEvent(council, "PATCH", "Council status is happening");
        }
        repository.save(council);
        return modelMapper.map(council, CouncilResponseDTO.class);
    }
}
