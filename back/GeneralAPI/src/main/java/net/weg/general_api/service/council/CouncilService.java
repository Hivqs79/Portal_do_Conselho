package net.weg.general_api.service.council;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.CouncilAlreadyHappeningException;
import net.weg.general_api.exception.exceptions.CouncilNotFoundException;
import net.weg.general_api.model.dto.request.council.CouncilRequestDTO;
import net.weg.general_api.model.dto.response.council.CouncilResponseDTO;
import net.weg.general_api.model.entity.annotation.Annotation;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.repository.CouncilRepository;
import net.weg.general_api.service.classes.ClassService;
import net.weg.general_api.service.kafka.KafkaEventSender;
import net.weg.general_api.service.users.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@AllArgsConstructor
public class CouncilService {

    private CouncilRepository repository;
    private ModelMapper modelMapper;
    private ClassService classService;
    private TeacherService teacherService;
    private final KafkaEventSender kafkaEventSender;

    public Page<CouncilResponseDTO> findCouncilSpec(Specification<Council> spec, Pageable pageable) {
        Page<Council> councils = repository.getAllByEnabledIsTrue(spec, pageable);
        return councils.map(council -> modelMapper.map(council, CouncilResponseDTO.class));
    }

    public CouncilResponseDTO createCouncil(CouncilRequestDTO councilRequestDTO) {
        Council council = modelMapper.map(councilRequestDTO, Council.class);

        council.setAClass(classService.findClassEntity(councilRequestDTO.getClass_id())); //SETAR CLASSE
        council.setTeachers(teacherService.getTeachersByIdList(councilRequestDTO.getTeachers_id())); //SETAR PROFESSOR

        Council councilSaved = repository.save(council);
        kafkaEventSender.sendEvent(councilSaved, "POST", "Council created");

        return modelMapper.map(councilSaved, CouncilResponseDTO.class);
    }

    public CouncilResponseDTO findCouncil(Long id) {
        Council council = findCouncilEntity(id);

        return modelMapper.map(council, CouncilResponseDTO.class);
    }

    public Council findCouncilEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new CouncilNotFoundException("Council not found"));
    }

    public Page<CouncilResponseDTO> pageCouncil(Pageable pageable) {
        Page<Council> council = repository.findAll(pageable);

        return council.map(annotation -> modelMapper.map(annotation, CouncilResponseDTO.class));
    }

    public CouncilResponseDTO updateCouncil(CouncilRequestDTO councilRequestDTO, Long id) {
        Council council = findCouncilEntity(id);
        modelMapper.map(councilRequestDTO, council);

        council.setAClass(classService.findClassEntity(councilRequestDTO.getClass_id())); //SETAR CLASSE
        council.setTeachers(teacherService.getTeachersByIdList(councilRequestDTO.getTeachers_id())); //SETAR PROFESSOR

        Council updatedCouncil = repository.save(council);
        kafkaEventSender.sendEvent(updatedCouncil, "PUT", "Council updated");

        return modelMapper.map(updatedCouncil, CouncilResponseDTO.class);
    }

    public CouncilResponseDTO disableCouncil(Long id) {
        Council council = findCouncilEntity(id);
        council.setEnabled(false);
        repository.save(council);
        kafkaEventSender.sendEvent(council, "DELETE", "Council disabled");

        return modelMapper.map(council, CouncilResponseDTO.class);
    }

    public List<Annotation> getAllAnnotations(Long id) {
        Council council = findCouncilEntity(id);

        return council.getAnnotations();
    }

    public CouncilResponseDTO modifyCouncilFinished(Long id) {
        Council council = findCouncilEntity(id);
        if (council.isFinished()) {
            council.setFinished(false);
            kafkaEventSender.sendEvent(council, "PATCH", "Council status not finished");
        } else {
            council.setFinished(true);
            kafkaEventSender.sendEvent(council, "PATCH", "Council status is finished");
        }
        repository.save(council);
        return modelMapper.map(council, CouncilResponseDTO.class);
    }

    public CouncilResponseDTO modifyCouncilStatus(Long id) {
        Council council = findCouncilEntity(id);
        if (council.isHappening()) {
            council.setHappening(false);
            kafkaEventSender.sendEvent(council, "PATCH", "Council status not happening");
        } else {

            if (repository.existsCouncilByisHappeningIsTrue()) {
                throw new CouncilAlreadyHappeningException("Ja existe um conselho rodando!");
            }

            council.setHappening(true);
            kafkaEventSender.sendEvent(council, "PATCH", "Council status is happening");
        }
        repository.save(council);
        return modelMapper.map(council, CouncilResponseDTO.class);
    }

    @Async
    public CompletableFuture<Council> findCouncilEntityAsync(Long id) {
        return CompletableFuture.completedFuture(findCouncilEntity(id));
    }
}
