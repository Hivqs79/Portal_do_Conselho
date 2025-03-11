package net.weg.userapi.service;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.StudentRequestDTO;
import net.weg.userapi.model.dto.response.StudentResponseDTO;
import net.weg.userapi.model.entity.Student;
import net.weg.userapi.repository.StudentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

@Service
@AllArgsConstructor
public class StudentService {

    private StudentRepository repository;
    private ModelMapper modelMapper;

    public StudentResponseDTO createStudent (StudentRequestDTO studentRequestDTO) {
        Student student = modelMapper.map(studentRequestDTO, Student.class);
        Student studentSaved = repository.save(student);
        StudentResponseDTO studentResponseDTO = modelMapper.map(studentSaved, StudentResponseDTO.class);

        return studentResponseDTO;
    }

}
