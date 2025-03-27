package net.weg.userapi.service.classes;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.ClassNotFoundException;
import net.weg.userapi.model.dto.request.classes.ClassRequestDTO;
import net.weg.userapi.model.dto.response.classes.ClassResponseDTO;
import net.weg.userapi.model.dto.response.users.StudentResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;
import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.repository.ClassRepository;
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

    public Page<ClassResponseDTO> findClassSpec(Specification<Class> spec, Pageable pageable) {
        Page<Class> classes = repository.findAll(spec, pageable);
        return classes.map(aClass -> modelMapper.map(aClass, ClassResponseDTO.class));
    }

    public List<StudentResponseDTO> getStudentsByClass(Long class_id) {
        Class aClass = findClassEntity(class_id);
        return aClass.getStudents().stream().map(student -> modelMapper.map(student, StudentResponseDTO.class)).collect(Collectors.toList());
    }

    public List<TeacherResponseDTO> getTeacherByClass(Long class_id) {
        Class aClass = findClassEntity(class_id);
        return aClass.getTeachers().stream().map(teacher -> modelMapper.map(teacher, TeacherResponseDTO.class)).collect(Collectors.toList());
    }

    public ClassResponseDTO createClass(ClassRequestDTO classesRequestDTO) {
        Class classes = modelMapper.map(classesRequestDTO, Class.class);
        Class classesSaved = repository.save(classes);

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
        return modelMapper.map(updatedClass, ClassResponseDTO.class);
    }

    public ClassResponseDTO deleteClass(Long id) {
        Class classes = findClassEntity(id);
        ClassResponseDTO classResponseDTO = modelMapper.map(classes, ClassResponseDTO.class);
        repository.delete(classes);
        return classResponseDTO;
    }

    public void mockarClass(List<ClassRequestDTO> classRequestDTOS) {
        List<Class> classes = classRequestDTOS.stream().map(classRequestDTO -> modelMapper.map(classRequestDTO, Class.class)).collect(Collectors.toList());
        repository.saveAll(classes);
    }

    public List<Class> getClassesByIdList(List<Long> classes_id) {
        return repository.findAllById(classes_id);
    }

}