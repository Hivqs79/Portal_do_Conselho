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

package net.weg.general_api.service.annotations;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.AnnotationNotFoundException;
import net.weg.general_api.exception.exceptions.UserNotAssociatedException;
import net.weg.general_api.model.dto.request.annotation.AnnotationStudentRequestDTO;
import net.weg.general_api.model.dto.response.annotation.AnnotationStudentResponseDTO;
import net.weg.general_api.model.entity.annotation.AnnotationStudent;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.repository.AnnotationStudentRepository;
import net.weg.general_api.service.council.CouncilService;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import net.weg.general_api.service.users.StudentService;
import net.weg.general_api.service.users.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class AnnotationStudentService {

    private AnnotationStudentRepository repository;
    private StudentService studentService;
    private TeacherService teacherService;
    private CouncilService councilService;
    private final KafkaEventSender kafkaEventSender;

    private ModelMapper modelMapper;

    public Page<AnnotationStudentResponseDTO> findAnnotationStudentSpec(Specification<AnnotationStudent> spec, Pageable pageable) {
        Page<AnnotationStudent> annotationStudents = repository.getAllByEnabledIsTrue(spec, pageable);
        return annotationStudents.map(annotationStudent -> modelMapper.map(annotationStudent, AnnotationStudentResponseDTO.class));
    }

    @Transactional
    public AnnotationStudentResponseDTO createAnnotationStudent(
            AnnotationStudentRequestDTO annotationStudentRequestDTO) {

        AnnotationStudent annotationStudent = modelMapper.map(annotationStudentRequestDTO, AnnotationStudent.class);

        Council council = councilService.findCouncilEntity(annotationStudentRequestDTO.getCouncil_id());
        Teacher teacher = teacherService.findTeacherEntity(annotationStudentRequestDTO.getTeacher_id());
        Student student = studentService.findStudentEntity(annotationStudentRequestDTO.getStudent_id());

        if (!council.getTeachers().contains(teacher)) {
            throw new UserNotAssociatedException("The teacher is not associated with this council");
        }

        if (!council.getAClass().getStudents().contains(student)) {
            throw new UserNotAssociatedException("The student is not associated with this council");
        }

        annotationStudent.setCouncil(council);
        annotationStudent.setStudent(student);
        annotationStudent.setTeacher(teacher);

        AnnotationStudent annotationSaved = repository.save(annotationStudent);
        kafkaEventSender.sendEvent(annotationSaved, "POST", "Annotation student created");
        return modelMapper.map(annotationSaved, AnnotationStudentResponseDTO.class);
    }

    public AnnotationStudentResponseDTO findAnnotationStudent(Long id) {
        AnnotationStudent annotationStudent = findAnnotationEntity(id);

        return modelMapper.map(annotationStudent, AnnotationStudentResponseDTO.class);
    }

    public AnnotationStudent findAnnotationEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new AnnotationNotFoundException("Student annotation not found"));
    }

    public Page<AnnotationStudentResponseDTO> pageAnnotationStudent(Pageable pageable) {
        Page<AnnotationStudent> annotationStudent = repository.findAll(pageable);

        return annotationStudent.map(annotation -> modelMapper.map(annotation, AnnotationStudentResponseDTO.class));
    }

    public Page<AnnotationStudentResponseDTO> pageAnnotationsByStudent(Long id, Pageable pageable) {
        Page<AnnotationStudent> annotationStudent = repository.findAllByStudent_Id(pageable, id);

        return annotationStudent.map(annotation -> modelMapper.map(annotation, AnnotationStudentResponseDTO.class));
    }

    public AnnotationStudentResponseDTO updateAnnotationStudent(AnnotationStudentRequestDTO annotationStudentRequestDTO, Long id) {
        AnnotationStudent annotationStudent = findAnnotationEntity(id);
        modelMapper.map(annotationStudentRequestDTO, annotationStudent);

        annotationStudent.setTeacher(teacherService.findTeacherEntity(annotationStudentRequestDTO.getTeacher_id()));
        annotationStudent.setStudent(studentService.findStudentEntity(annotationStudentRequestDTO.getStudent_id()));

        AnnotationStudent updatedAnnotationStudent = repository.save(annotationStudent);
        kafkaEventSender.sendEvent(updatedAnnotationStudent, "PUT", "Student updated");

        return modelMapper.map(updatedAnnotationStudent, AnnotationStudentResponseDTO.class);
    }

    public AnnotationStudentResponseDTO disableAnnotationStudent(Long id) {
        AnnotationStudent annotationStudent = findAnnotationEntity(id);
        annotationStudent.setEnabled(false);
        repository.save(annotationStudent);
        kafkaEventSender.sendEvent(annotationStudent, "DELETE", "Student disabled");

        return modelMapper.map(annotationStudent, AnnotationStudentResponseDTO.class);
    }

    public boolean existsByTeacherCouncilAndStudent(Long teacherId, Long councilId, Long studentId) {
        return repository.existsByTeacher_IdAndCouncil_IdAndStudent_Id(teacherId, councilId, studentId);
    }
}
