package net.weg.userapi.service.users;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.UserNotFoundException;
import net.weg.userapi.model.dto.request.users.TeacherRequestDTO;
import net.weg.userapi.model.dto.response.classes.ClassResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;
import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.model.entity.users.Teacher;
import net.weg.userapi.repository.TeacherRepository;
import net.weg.userapi.service.classes.ClassService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TeacherService {

    private TeacherRepository repository;
    private ClassService classService;
    private CustomizationService customizationService;
    private ModelMapper modelMapper;

    public Page<TeacherResponseDTO> findTeacherSpec(Specification<Teacher> spec, Pageable pageable) {
        Page<Teacher> teachers = repository.findAll(spec, pageable);
        return teachers.map(teacher -> modelMapper.map(teacher, TeacherResponseDTO.class));
    }

    public TeacherResponseDTO createTeacher(TeacherRequestDTO teacherRequestDTO) {
        Teacher teacher = modelMapper.map(teacherRequestDTO, Teacher.class);

        teacher.setClasses(classService.getClassesByIdList(teacherRequestDTO.getClasses_id()));
        Teacher teacherSaved = repository.save(teacher);
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
        return modelMapper.map(updatedTeacher, TeacherResponseDTO.class);
    }

    public TeacherResponseDTO deleteTeacher(Long id) {
        Teacher teacher = findTeacherEntity(id);
        TeacherResponseDTO teacherResponseDTO = modelMapper.map(teacher, TeacherResponseDTO.class);
        repository.delete(teacher);
        return teacherResponseDTO;
    }

    public List<ClassResponseDTO> getClassByTeacher(Long teacher_id) {
        Teacher teacher = findTeacherEntity(teacher_id);
        return teacher.getClasses().stream().map(aClass -> modelMapper.map(aClass, ClassResponseDTO.class)).collect(Collectors.toList());
    }

    public void mockarTeacher(List<TeacherRequestDTO> teacherRequestDTOS) {
        List<Teacher> teacher = teacherRequestDTOS.stream().map(teacherRequestDTO -> modelMapper.map(teacherRequestDTO, Teacher.class)).collect(Collectors.toList());
        repository.saveAll(teacher);
    }

    public List<Teacher> getTeachersByIdList(List<Long> teachers_id) {
        return repository.findAllById(teachers_id);
    }

    public TeacherResponseDTO addTeacherClasss(Long id, List<Long> classesId) {
        Teacher teacher = findTeacherEntity(id);
        List<Class> classes = teacher.getClasses();

        classesId.forEach(integer -> {
            Class aClass = classService.findClassEntity(integer);
            if (!classes.contains(aClass)) {
                classes.add(aClass);
            }
        });
        teacher.setClasses(classes);
        repository.save(teacher);

        return modelMapper.map(teacher, TeacherResponseDTO.class);
    }

    public TeacherResponseDTO removeTeacherClasss(Long id, List<Long> classesId) {
        Teacher teacher = findTeacherEntity(id);
        List<Class> classes = teacher.getClasses();

        classesId.forEach(integer -> {
            Class aClass = classService.findClassEntity(integer);
            classes.remove(aClass);
        });
        teacher.setClasses(classes);
        repository.save(teacher);

        return modelMapper.map(teacher, TeacherResponseDTO.class);
    }
}
