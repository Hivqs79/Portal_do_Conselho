package net.weg.userapi.service.users;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.UserNotFoundException;
import net.weg.userapi.model.dto.request.users.TeacherRequestDTO;
import net.weg.userapi.model.dto.response.ClassResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;
import net.weg.userapi.model.entity.users.Teacher;
import net.weg.userapi.repository.TeacherRepository;
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
    private ModelMapper modelMapper;

    public TeacherResponseDTO createTeacher(TeacherRequestDTO teacherRequestDTO) {
        Teacher teacher = modelMapper.map(teacherRequestDTO, Teacher.class);
        Teacher teacherSaved = repository.save(teacher);

        return modelMapper.map(teacherSaved, TeacherResponseDTO.class);
    }

    public TeacherResponseDTO findTeacher(Integer id) {
        Teacher teacherFound = findTeacherEntity(id);

        return modelMapper.map(teacherFound, TeacherResponseDTO.class);
    }

    public Teacher findTeacherEntity(Integer id) {
        return repository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public Page<TeacherResponseDTO> pageTeacher(Pageable pageable) {
        Page<Teacher> teacherPage = repository.findAll(pageable);

        return teacherPage.map(teacher -> modelMapper.map(teacher, TeacherResponseDTO.class));
    }

    public TeacherResponseDTO updateTeacher(TeacherRequestDTO teacherRequestDTO, Integer id) {
        Teacher teacher = findTeacherEntity(id);
        modelMapper.map(teacherRequestDTO, teacher);
        teacher.setClasses(teacherRequestDTO.getClasses()); //ATUALIZAR O MANY TO MANY
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

    public void mockarTeacher (List<TeacherRequestDTO> teacherRequestDTOS) {
        List<Teacher> teacher = teacherRequestDTOS.stream().map(teacherRequestDTO -> modelMapper.map(teacherRequestDTO, Teacher.class)).collect(Collectors.toList());
        repository.saveAll(teacher);
    }
}
