package net.weg.userapi.service.users;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.UserNotFoundException;
import net.weg.userapi.model.dto.request.users.TeacherRequestDTO;
import net.weg.userapi.model.dto.response.ClassResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;
import net.weg.userapi.model.entity.Class;
import net.weg.userapi.model.entity.users.Teacher;
import net.weg.userapi.repository.TeacherRepository;
import net.weg.userapi.service.ClassService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TeacherService {

    private TeacherRepository repository;
    private ClassService classService;
    private ModelMapper modelMapper;

    public TeacherResponseDTO createTeacher(TeacherRequestDTO teacherRequestDTO) {
        Teacher teacher = modelMapper.map(teacherRequestDTO, Teacher.class);

        teacher.setClasses(classService.getClassesByIdList(teacherRequestDTO.getClasses_id()));

        Teacher teacherSaved = repository.save(teacher);

        return modelMapper.map(teacherSaved, TeacherResponseDTO.class);
    }

    public TeacherResponseDTO findTeacher(Integer id) {
        Teacher teacherFound = findTeacherEntity(id);

        return modelMapper.map(teacherFound, TeacherResponseDTO.class);
    }

    public Teacher findTeacherEntity(Integer id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException("Teacher user not found"));
    }

    public Page<TeacherResponseDTO> pageTeacher(Pageable pageable) {
        Page<Teacher> teacherPage = repository.findAll(pageable);

        return teacherPage.map(teacher -> modelMapper.map(teacher, TeacherResponseDTO.class));
    }

    public TeacherResponseDTO updateTeacher(TeacherRequestDTO teacherRequestDTO, Integer id) {
        Teacher teacher = findTeacherEntity(id);
        modelMapper.map(teacherRequestDTO, teacher);

        teacher.setClasses(classService.getClassesByIdList(teacherRequestDTO.getClasses_id()));

        Teacher updatedTeacher = repository.save(teacher);
        return modelMapper.map(updatedTeacher, TeacherResponseDTO.class);
    }

    public TeacherResponseDTO deleteTeacher(Integer id) {
        Teacher teacher = findTeacherEntity(id);
        TeacherResponseDTO teacherResponseDTO = modelMapper.map(teacher, TeacherResponseDTO.class);
        repository.delete(teacher);
        return teacherResponseDTO;
    }

    public List<ClassResponseDTO> getClassByTeacher(Integer teacher_id) {
        Teacher teacher = findTeacherEntity(teacher_id);
        return teacher.getClasses().stream().map(aClass -> modelMapper.map(aClass, ClassResponseDTO.class)).collect(Collectors.toList());
    }

    public void mockarTeacher(List<TeacherRequestDTO> teacherRequestDTOS) {
        List<Teacher> teacher = teacherRequestDTOS.stream().map(teacherRequestDTO -> modelMapper.map(teacherRequestDTO, Teacher.class)).collect(Collectors.toList());
        repository.saveAll(teacher);
    }

    public List<Teacher> getTeachersByIdList(List<Integer> teachers_id) {
        return repository.findAllById(teachers_id);
    }

    public TeacherResponseDTO addTeacherClasss(Integer id, List<Integer> classesId) {
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

    public TeacherResponseDTO removeTeacherClasss(Integer id, List<Integer> classesId) {
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
