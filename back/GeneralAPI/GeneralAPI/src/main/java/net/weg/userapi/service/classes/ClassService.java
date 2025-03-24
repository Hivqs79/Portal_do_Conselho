package net.weg.userapi.service.classes;

import lombok.AllArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ClassService {

    private ClassRepository repository;
    private ModelMapper modelMapper;

    public List<ClassResponseDTO> findClassSpec(Specification<Class> spec) {
        try {
            return repository.findAll(spec).stream().map(aClass -> modelMapper.map(aClass, ClassResponseDTO.class)).collect(Collectors.toList());
        } catch (Exception e) {
            throw new RuntimeException("Error executing specification search", e);
        }
    }

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
        return repository.findById(id).orElseThrow(() -> new ClassNotFoundException("Class not found"));
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
        ClassResponseDTO classResponseDTO = modelMapper.map(classes, ClassResponseDTO.class);
        repository.delete(classes);
        return classResponseDTO;
    }

    public void mockarClass(List<ClassRequestDTO> classRequestDTOS) {
        List<Class> classes = classRequestDTOS.stream().map(classRequestDTO -> modelMapper.map(classRequestDTO, Class.class)).collect(Collectors.toList());
        repository.saveAll(classes);
    }

    public List<Class> getClassesByIdList(List<Integer> classes_id) {
        return repository.findAllById(classes_id);
    }

}
