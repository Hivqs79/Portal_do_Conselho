package net.weg.userapi.service;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.UserNotFoundException;
import net.weg.userapi.model.dto.request.TeacherRequestDTO;
import net.weg.userapi.model.dto.response.TeacherResponseDTO;
import net.weg.userapi.model.entity.Class;
import net.weg.userapi.model.entity.Teacher;
import net.weg.userapi.repository.TeacherRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class TeacherService {

    private TeacherRepository repository;
    private ModelMapper modelMapper;

    public TeacherResponseDTO createTeacher(TeacherRequestDTO teacherRequestDTO) {
        System.out.println(teacherRequestDTO.getClasses());
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
        repository.delete(teacher);
        return modelMapper.map(teacher, TeacherResponseDTO.class);
    }
}
