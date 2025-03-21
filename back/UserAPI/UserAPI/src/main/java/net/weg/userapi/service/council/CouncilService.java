package net.weg.userapi.service.council;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.council.CouncilRequestDTO;
import net.weg.userapi.model.dto.response.council.CouncilResponseDTO;
import net.weg.userapi.model.entity.Class;
import net.weg.userapi.model.entity.annotation.Annotation;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.repository.CouncilRepository;
import net.weg.userapi.service.ClassService;
import net.weg.userapi.service.users.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class CouncilService {

    private CouncilRepository repository;
    private ModelMapper modelMapper;
    private ClassService classService;
    private TeacherService teacherService;

    public CouncilResponseDTO createCouncil(CouncilRequestDTO councilRequestDTO) {
        Council council = modelMapper.map(councilRequestDTO, Council.class);

        council.setAClass(classService.findClassEntity(councilRequestDTO.getClass_id())); //SETAR CLASSE
        council.setTeachers(teacherService.getTeachersByIdList(councilRequestDTO.getTeachers_id())); //SETAR PROFESSOR

        Council councilSaved = repository.save(council);

        return modelMapper.map(councilSaved, CouncilResponseDTO.class);
    }

    public CouncilResponseDTO findCouncil(Integer id) {
        Council council = findCouncilEntity(id);

        return modelMapper.map(council, CouncilResponseDTO.class);
    }

    public Council findCouncilEntity(Integer id) {
        return repository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Page<CouncilResponseDTO> pageCouncil(Pageable pageable) {
        Page<Council> council = repository.findAll(pageable);

        return council.map(annotation -> modelMapper.map(annotation, CouncilResponseDTO.class));
    }

    public CouncilResponseDTO updateCouncil(CouncilRequestDTO councilRequestDTO, Integer id) {
        Council council = findCouncilEntity(id);
        modelMapper.map(councilRequestDTO, council);

        council.setAClass(classService.findClassEntity(councilRequestDTO.getClass_id())); //SETAR CLASSE
        council.setTeachers(teacherService.getTeachersByIdList(councilRequestDTO.getTeachers_id())); //SETAR PROFESSOR

        Council updatedCouncil = repository.save(council);
        return modelMapper.map(updatedCouncil, CouncilResponseDTO.class);
    }

    public CouncilResponseDTO deleteCouncil(Integer id) {
        Council council = findCouncilEntity(id);
        CouncilResponseDTO councilResponseDTO = modelMapper.map(council, CouncilResponseDTO.class);
        repository.delete(council);
        return councilResponseDTO;
    }

    public List<Annotation> getAllAnnotations(Integer id) {
        Council council = findCouncilEntity(id);

        return council.getAnnotations();
    }

}
