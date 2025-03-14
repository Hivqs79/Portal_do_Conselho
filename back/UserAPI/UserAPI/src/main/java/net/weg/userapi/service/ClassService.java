package net.weg.userapi.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import net.weg.userapi.exception.exceptions.UserNotFoundException;
import net.weg.userapi.model.dto.request.ClassRequestDTO;
import net.weg.userapi.model.dto.response.ClassResponseDTO;
import net.weg.userapi.model.dto.response.StudentResponseDTO;
import net.weg.userapi.model.dto.response.TeacherResponseDTO;
import net.weg.userapi.model.entity.Class;
import net.weg.userapi.model.entity.Student;
import net.weg.userapi.repository.ClassRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ClassService {

    private ClassRepository repository;
    private ModelMapper modelMapper;

    public List<StudentResponseDTO> getStudentsByClass(Integer class_id) {
        Class aClass = findClassEntity(class_id);
        return aClass.getStudents().stream().map(student -> modelMapper.map(student, StudentResponseDTO.class)).collect(Collectors.toList());
    }

    public List<TeacherResponseDTO> getTeacherByClass(Integer class_id) {
        Class aClass = findClassEntity(class_id);
        return aClass.getTeachers().stream().map(teacher -> modelMapper.map(teacher, TeacherResponseDTO.class)).collect(Collectors.toList());
    }

    public ClassResponseDTO createClass(ClassRequestDTO classesRequestDTO) {
        Class classes = modelMapper.map(classesRequestDTO, Class.class);
        Class classesSaved = repository.save(classes);

        return modelMapper.map(classesSaved, ClassResponseDTO.class);
    }

    public ClassResponseDTO findClass(Integer id) {
        Class classesFound = findClassEntity(id);

        return modelMapper.map(classesFound, ClassResponseDTO.class);
    }

    public Class findClassEntity(Integer id) {
        return repository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public Page<ClassResponseDTO> pageClass(Pageable pageable) {
        Page<Class> classesPage = repository.findAll(pageable);

        return classesPage.map(classes -> modelMapper.map(classes, ClassResponseDTO.class));
    }

    public ClassResponseDTO updateClass(ClassRequestDTO classesRequestDTO, Integer id) {
        Class classes = findClassEntity(id);
        modelMapper.map(classesRequestDTO, classes);
        Class updatedClass = repository.save(classes);
        return modelMapper.map(updatedClass, ClassResponseDTO.class);
    }

    public ClassResponseDTO deleteClass(Integer id) {
        Class classes = findClassEntity(id);
        repository.delete(classes);
        return modelMapper.map(classes, ClassResponseDTO.class);
    }
}
