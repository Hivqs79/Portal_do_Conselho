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
import net.weg.general_api.model.dto.request.users.TeacherRequestDTO;
import net.weg.general_api.model.dto.response.classes.ClassResponseDTO;
import net.weg.general_api.model.dto.response.users.TeacherResponseDTO;
import net.weg.general_api.model.dto.response.users.UserAuthenticationResponseDTO;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.model.enums.RoleENUM;
import net.weg.general_api.repository.TeacherRepository;
import net.weg.general_api.service.classes.ClassService;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import net.weg.general_api.service.security.EmailApiClient;
import net.weg.general_api.service.security.EmailService;
import net.weg.general_api.service.security.PasswordGeneratorService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TeacherService {

    private TeacherRepository repository;
    private ClassService classService;
    private CustomizationService customizationService;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;
    private UserAuthenticationService userAuthenticationService;
    private final EmailService emailService;

    public Page<TeacherResponseDTO> findTeacherSpec(Specification<Teacher> spec, Pageable pageable) {
        Page<Teacher> teachers = repository.getAllByEnabledIsTrue(spec, pageable);
        return teachers.map(teacher -> new TeacherResponseDTO(
                teacher.getId(),
                teacher.getName(),
                teacher.getCreateDate(),
                teacher.getUpdateDate(),
                teacher.getClasses().stream().map(aClass -> modelMapper.map(aClass, ClassResponseDTO.class)).toList(),
                modelMapper.map(teacher.getUserAuthentication(), UserAuthenticationResponseDTO.class)
        ));
    }

    public Page<TeacherResponseDTO> findTeacherSpecByClass(Specification<Teacher> spec, Long classId, Pageable pageable) {
        Page<Teacher> teachers = repository.findAllByClassIdAndSpec(classId, spec, pageable);
        return teachers.map(teacher -> modelMapper.map(teacher, TeacherResponseDTO.class));
    }

    public TeacherResponseDTO createTeacher(TeacherRequestDTO teacherRequestDTO) {
        Teacher teacher = modelMapper.map(teacherRequestDTO, Teacher.class);
        String randomPassword = PasswordGeneratorService.generateSimpleAlphanumericPassword();

        teacher.setUserAuthentication(
                userAuthenticationService.saveUserAuthentication(teacherRequestDTO.getEmail(), randomPassword, RoleENUM.TEACHER)
        );
        teacher.setClasses(classService.getClassesByIdList(teacherRequestDTO.getClasses_id()));

        Teacher teacherSaved = repository.save(teacher);

        emailService.sendPasswordEmailAsync(
                teacherRequestDTO.getEmail(),
                teacherRequestDTO.getName(), // Assumindo que existe um campo name no DTO
                randomPassword
        );

        kafkaEventSender.sendEvent(teacherSaved, "POST", "Teacher created");
        teacherSaved.setCustomization(customizationService.setDefault(teacherSaved));

        return modelMapper.map(teacherSaved, TeacherResponseDTO.class);
    }

    public TeacherResponseDTO findTeacher(Long id) {
        Teacher teacherFound = findTeacherEntity(id);

        return modelMapper.map(teacherFound, TeacherResponseDTO.class);
    }

    public Teacher findTeacherEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException("Teacher user not found"));
    }

    public TeacherResponseDTO updateTeacher(TeacherRequestDTO teacherRequestDTO, Long id) {
        Teacher teacher = findTeacherEntity(id);
        modelMapper.map(teacherRequestDTO, teacher);

        teacher.setClasses(classService.getClassesByIdList(teacherRequestDTO.getClasses_id()));

        Teacher updatedTeacher = repository.save(teacher);
        kafkaEventSender.sendEvent(updatedTeacher, "PUT", "Teacher updated");
        return modelMapper.map(updatedTeacher, TeacherResponseDTO.class);
    }

    public TeacherResponseDTO disableTeacher(Long id) {
        Teacher teacher = findTeacherEntity(id);
        teacher.getUserAuthentication().setEnabled(false);
        repository.save(teacher);
        kafkaEventSender.sendEvent(teacher, "DELETE", "Teacher deleted");
        return modelMapper.map(teacher, TeacherResponseDTO.class);
    }

    public List<ClassResponseDTO> getClassByTeacher(Long teacher_id) {
        Teacher teacher = findTeacherEntity(teacher_id);
        return teacher.getClasses().stream().map(aClass -> modelMapper.map(aClass, ClassResponseDTO.class)).collect(Collectors.toList());
    }

    public List<Teacher> getTeachersByIdList(List<Long> teachers_id) {
        return repository.findAllById(teachers_id);
    }

    public TeacherResponseDTO addTeacherClass(Long id, List<Long> classesId) {
        Teacher teacher = findTeacherEntity(id);
        List<Class> classes = teacher.getClasses();

        classesId.forEach(integer -> {
            Class aClass = classService.findClassEntity(integer);
            if (!classes.contains(aClass)) {
                kafkaEventSender.sendEvent(teacher, "PATCH", "Teacher updated to new class: " + aClass);
                classes.add(aClass);
            }
        });
        teacher.setClasses(classes);
        repository.save(teacher);

        return modelMapper.map(teacher, TeacherResponseDTO.class);
    }

    public TeacherResponseDTO removeTeacherClass(Long id, List<Long> classesId) {
        Teacher teacher = findTeacherEntity(id);
        List<Class> classes = teacher.getClasses();

        classesId.forEach(integer -> {
            Class aClass = classService.findClassEntity(integer);
            kafkaEventSender.sendEvent(teacher, "PATCH", "Teacher removed from class: " + aClass);
            classes.remove(aClass);
        });
        teacher.setClasses(classes);
        repository.save(teacher);

        return modelMapper.map(teacher, TeacherResponseDTO.class);
    }
    @Async
    public CompletableFuture<Teacher> findTeacherEntityAsync(Long teacherId) {
        return CompletableFuture.completedFuture(findTeacherEntity(teacherId));
    }
}
