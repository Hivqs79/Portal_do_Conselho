package net.weg.userapi.service.council;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.council.CouncilRequestDTO;
import net.weg.userapi.model.dto.response.council.CouncilResponseDTO;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.repository.CouncilRepository;
import net.weg.userapi.service.ClassService;
import net.weg.userapi.service.users.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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

        council.setTeachers(councilRequestDTO.getTeachers()); //SETAR PROFESSOR

        Council councilSaved = repository.save(council);

        return modelMapper.map(councilSaved, CouncilResponseDTO.class);
    }

    public CouncilResponseDTO findCouncil(Integer id) {
        Council council = findAnnotationEntity(id);

        return modelMapper.map(council, CouncilResponseDTO.class);
    }

    public Council findAnnotationEntity(Integer id) {
        return repository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Page<CouncilResponseDTO> pageCouncil(Pageable pageable) {
        Page<Council> council = repository.findAll(pageable);

        return council.map(annotation -> modelMapper.map(annotation, CouncilResponseDTO.class));
    }

    public CouncilResponseDTO updateCouncil(CouncilRequestDTO councilRequestDTO, Integer id) {
        Council council = findAnnotationEntity(id);
        modelMapper.map(councilRequestDTO, council);

        //council.setTeacher(teacherService.findTeacherEntity(councilRequestDTO.getTeacher_id()));
        council.setAClass(classService.findClassEntity(councilRequestDTO.getClass_id()));

        Council updatedCouncil = repository.save(council);
        return modelMapper.map(updatedCouncil, CouncilResponseDTO.class);
    }

    public CouncilResponseDTO deleteCouncil(Integer id) {
        Council council = findAnnotationEntity(id);
        CouncilResponseDTO councilResponseDTO = modelMapper.map(council, CouncilResponseDTO.class);
        repository.delete(council);
        return councilResponseDTO;
    }


}
