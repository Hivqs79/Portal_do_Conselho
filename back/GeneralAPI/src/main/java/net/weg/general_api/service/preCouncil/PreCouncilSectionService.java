package net.weg.general_api.service.preCouncil;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.PreCouncilSectionNotFoundException;
import net.weg.general_api.model.dto.request.preCouncil.PreCouncilSectionRequestDTO;
import net.weg.general_api.model.dto.response.preCouncil.PreCouncilSectionResponseDTO;
import net.weg.general_api.model.entity.preCouncil.PreCouncilSection;
import net.weg.general_api.repository.PreCouncilSectionRepository;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PreCouncilSectionService {

    private PreCouncilSectionRepository repository;
    private ModelMapper modelMapper;
    private PreCouncilService preCouncilService;
    private final KafkaEventSender kafkaEventSender;

    public Page<PreCouncilSectionResponseDTO> findPreCouncilSectionSpec(Specification<PreCouncilSection> spec, Pageable pageable) {
        Page<PreCouncilSection> preCouncilSections = repository.getAllByEnabledIsTrue(spec, pageable);
        return preCouncilSections.map(preCouncilSection -> modelMapper.map(preCouncilSection, PreCouncilSectionResponseDTO.class));
    }

    public PreCouncilSectionResponseDTO createPreCouncilSection(PreCouncilSectionRequestDTO preCouncilSectionRequestDTO) {
        PreCouncilSection preCouncilSection = modelMapper.map(preCouncilSectionRequestDTO, PreCouncilSection.class);

        preCouncilSection.setPreCouncil(preCouncilService.findPreCouncilEntity(preCouncilSectionRequestDTO.getPreCouncil_id()));

        PreCouncilSection preCouncilSectionSaved = repository.save(preCouncilSection);
        kafkaEventSender.sendEvent(preCouncilSectionSaved, "POST", "PreCouncil section created");
        return modelMapper.map(preCouncilSectionSaved, PreCouncilSectionResponseDTO.class);
    }

    public PreCouncilSectionResponseDTO findPreCouncilSection(Long id) {
        PreCouncilSection preCouncilSection = findPreCouncilSectionEntity(id);

        return modelMapper.map(preCouncilSection, PreCouncilSectionResponseDTO.class);
    }

    public PreCouncilSection findPreCouncilSectionEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new PreCouncilSectionNotFoundException("Pre council section not found"));
    }

    public PreCouncilSectionResponseDTO updatePreCouncilSection(PreCouncilSectionRequestDTO preCouncilSectionRequestDTO, Long id) {
        PreCouncilSection preCouncilSection = findPreCouncilSectionEntity(id);
        modelMapper.map(preCouncilSectionRequestDTO, preCouncilSection);

        preCouncilSection.setPreCouncil(preCouncilService.findPreCouncilEntity(preCouncilSectionRequestDTO.getPreCouncil_id()));

        PreCouncilSection updatedPreCouncilSection = repository.save(preCouncilSection);
        kafkaEventSender.sendEvent(updatedPreCouncilSection, "PUT", "PreCouncil section updated");
        return modelMapper.map(updatedPreCouncilSection, PreCouncilSectionResponseDTO.class);
    }

    public PreCouncilSectionResponseDTO disablePreCouncilSection(Long id) {
        PreCouncilSection preCouncilSection = findPreCouncilSectionEntity(id);
        preCouncilSection.setEnabled(false);
        repository.save(preCouncilSection);
        kafkaEventSender.sendEvent(preCouncilSection, "DELETE", "PreCouncil section disabled");
        return modelMapper.map(preCouncilSection, PreCouncilSectionResponseDTO.class);
    }

    public boolean existPreCouncilSectionByPreCouncilAndTopic(Long preCouncilId, String topic) {
        return repository.existsByPreCouncil_IdAndTopic(preCouncilId, topic);
    }

    public List<PreCouncilSectionResponseDTO> getAllByPreCouncilId(Long idPreCouncil) {
        List<PreCouncilSection> preCouncilSectionList = repository.getAllByPreCouncil_Id(idPreCouncil);
        return preCouncilSectionList.stream().map(preCouncilSection -> modelMapper.map(preCouncilSection, PreCouncilSectionResponseDTO.class)).toList();
    }
}
