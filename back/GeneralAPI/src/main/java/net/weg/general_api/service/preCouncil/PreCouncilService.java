package net.weg.general_api.service.preCouncil;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.ClassNotFoundException;
import net.weg.general_api.exception.exceptions.PreCouncilNotFoundException;
import net.weg.general_api.model.dto.request.preCouncil.PreCouncilRequestDTO;
import net.weg.general_api.model.dto.response.preCouncil.PreCouncilResponseDTO;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.preCouncil.PreCouncil;
import net.weg.general_api.repository.PreCouncilRepository;
import net.weg.general_api.service.classes.ClassService;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import net.weg.general_api.service.users.TeacherService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@AllArgsConstructor
public class PreCouncilService {

    private PreCouncilRepository repository;
    private ClassService classService;
    private TeacherService teacherService;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;

    public Page<PreCouncilResponseDTO> findPreCouncilSpec(Specification<PreCouncil> spec, Pageable pageable) {
        Page<PreCouncil> preCouncils = repository.getAllByEnabledIsTrue(spec, pageable);
        return preCouncils.map(preCouncil -> modelMapper.map(preCouncil, PreCouncilResponseDTO.class));
    }

    public PreCouncilResponseDTO createPreCouncil(PreCouncilRequestDTO preCouncilRequestDTO) {
        PreCouncil preCouncil = modelMapper.map(preCouncilRequestDTO, PreCouncil.class);

        preCouncil.setAClass(classService.findClassEntity(preCouncilRequestDTO.getClass_id()));
        preCouncil.setTeachers(teacherService.getTeachersByIdList(preCouncilRequestDTO.getTeachers_id()));

        PreCouncil preCouncilSaved = repository.save(preCouncil);
        kafkaEventSender.sendEvent(preCouncilSaved, "POST", "Pre council created");

        return modelMapper.map(preCouncilSaved, PreCouncilResponseDTO.class);
    }

    public PreCouncilResponseDTO findPreCouncil(Long id) {
        PreCouncil preCouncil = findPreCouncilEntity(id);

        return modelMapper.map(preCouncil, PreCouncilResponseDTO.class);
    }

    public PreCouncil findPreCouncilEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new PreCouncilNotFoundException("Pre council not found"));
    }

    public PreCouncilResponseDTO updatePreCouncil(PreCouncilRequestDTO preCouncilRequestDTO, Long id) {
        PreCouncil preCouncil = findPreCouncilEntity(id);
        modelMapper.map(preCouncilRequestDTO, preCouncil);

        preCouncil.setAClass(classService.findClassEntity(preCouncilRequestDTO.getClass_id()));
        preCouncil.setTeachers(teacherService.getTeachersByIdList(preCouncilRequestDTO.getTeachers_id()));

        PreCouncil updatedPreCouncil = repository.save(preCouncil);
        kafkaEventSender.sendEvent(updatedPreCouncil, "PUT", "Pre council updated");
        return modelMapper.map(updatedPreCouncil, PreCouncilResponseDTO.class);
    }

    public PreCouncilResponseDTO disablePreCouncil(Long id) {
        PreCouncil preCouncil = findPreCouncilEntity(id);
        preCouncil.setEnabled(false);
        repository.save(preCouncil);
        kafkaEventSender.sendEvent(preCouncil, "DELETE", "Pre council disabled");
        return modelMapper.map(preCouncil, PreCouncilResponseDTO.class);
    }

    public PreCouncilResponseDTO getPreCouncilByLeaderId(Long idLeader) {
        List<Class> classList = classService.getClassesByLeaderId(idLeader);
        Class newestClass = classList.stream()
                .max(Comparator.comparing(Class::getCreateDate))
                .orElseThrow(() -> new ClassNotFoundException("Class with leader id:" + idLeader + " not found"));
        PreCouncil preCouncil = repository.findPreCouncilByAClassIdAndAnswered(newestClass.getId(), false).getFirst();
        return modelMapper.map(preCouncil, PreCouncilResponseDTO.class);
    }

    public PreCouncilResponseDTO finalizePreCouncil(Long id) {
        PreCouncil preCouncil = this.findPreCouncilEntity(id);
        preCouncil.setAnswered(true);
        preCouncil = repository.save(preCouncil);
        kafkaEventSender.sendEvent(preCouncil, "PATCH", "Pre-council finalized");
        return modelMapper.map(preCouncil, PreCouncilResponseDTO.class);
    }

    public void returnPreCouncil(Long id) {
        PreCouncil preCouncil = this.findPreCouncilEntity(id);
        preCouncil.setReturned(true);
        preCouncil = repository.save(preCouncil);
        kafkaEventSender.sendEvent(preCouncil, "PATCH", "Pre-council returned");
    }
}
