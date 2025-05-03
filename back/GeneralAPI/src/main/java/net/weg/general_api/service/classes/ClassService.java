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

package net.weg.general_api.service.classes;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.ClassNotFoundException;
import net.weg.general_api.model.dto.request.classes.ClassRequestDTO;
import net.weg.general_api.model.dto.response.classes.ClassResponseDTO;
import net.weg.general_api.model.dto.response.users.StudentResponseDTO;
import net.weg.general_api.model.dto.response.users.TeacherResponseDTO;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.repository.ClassRepository;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ClassService {

    private ClassRepository repository;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;

    public Page<ClassResponseDTO> findClassSpec(Specification<Class> spec, Pageable pageable) {
        Page<Class> classes = repository.getAllByEnabledIsTrue(spec, pageable);
        return classes.map(aClass -> modelMapper.map(aClass, ClassResponseDTO.class));
    }

    //TODO FAZER ISSO NO RESTO
    public List<StudentResponseDTO> getStudentsByClass(Long class_id) {
        Class aClass = findClassEntity(class_id);
        return aClass.getStudents().stream()
                .filter(student -> student.getUserAuthentication().isEnabled())
                .map(student -> modelMapper.map(student, StudentResponseDTO.class))
                .collect(Collectors.toList());
    }

    public List<TeacherResponseDTO> getTeacherByClass(Long class_id) {
        Class aClass = findClassEntity(class_id);
        return aClass.getTeachers().stream().map(teacher -> modelMapper.map(teacher, TeacherResponseDTO.class)).collect(Collectors.toList());
    }

    public ClassResponseDTO createClass(ClassRequestDTO classesRequestDTO) {
        Class classes = modelMapper.map(classesRequestDTO, Class.class);
        Class classesSaved = repository.save(classes);
        kafkaEventSender.sendEvent(classes, "POST", "Class created");

        return modelMapper.map(classesSaved, ClassResponseDTO.class);
    }

    public ClassResponseDTO findClass(Long id) {
        Class classesFound = findClassEntity(id);

        return modelMapper.map(classesFound, ClassResponseDTO.class);
    }

    public Class findClassEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new ClassNotFoundException("Class not found"));
    }

    public ClassResponseDTO updateClass(ClassRequestDTO classesRequestDTO, Long id) {
        Class classes = findClassEntity(id);
        modelMapper.map(classesRequestDTO, classes);
        Class updatedClass = repository.save(classes);
        kafkaEventSender.sendEvent(updatedClass, "PUT", "Class updated");

        return modelMapper.map(updatedClass, ClassResponseDTO.class);
    }

    public ClassResponseDTO disableClass(Long id) {
        Class classes = findClassEntity(id);
        classes.setEnabled(false);
        repository.save(classes);
        kafkaEventSender.sendEvent(classes, "DELETE", "Class disabled");

        return modelMapper.map(classes, ClassResponseDTO.class);
    }


    public List<Class> getClassesByIdList(List<Long> classes_id) {
        return repository.findAllById(classes_id);
    }

    public Class getClassByClassName(String className) {
        return repository.findClassByName(className);
    }

    public List<Class> getAllClasses() {
        return repository.findAll();
    }

    public List<Class> getClassesByLeaderId(Long idLeader) {
        return repository.findAllByStudents_Id(idLeader);
    }

}