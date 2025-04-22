package net.weg.general_api.service.users;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.dto.request.users.PedagogicRequestDTO;
import net.weg.general_api.model.dto.response.users.PedagogicResponseDTO;
import net.weg.general_api.model.entity.users.Pedagogic;
import net.weg.general_api.repository.PedagogicRepository;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PedagogicService {

    private PedagogicRepository repository;
    private CustomizationService customizationService;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;

    public Page<PedagogicResponseDTO> findPedagogicSpec(Specification<Pedagogic> spec, Pageable pageable) {
        Page<Pedagogic> pedagogics = repository.getAllByEnabledIsTrue(spec, pageable);
        return pedagogics.map(pedagogic -> modelMapper.map(pedagogic, PedagogicResponseDTO.class));
    }

    public List<Pedagogic> findAllPedagogicEntity() {
        return repository.findAll();
    }

    public PedagogicResponseDTO createPedagogic(PedagogicRequestDTO pedagogicRequestDTO) {
        Pedagogic pedagogic = modelMapper.map(pedagogicRequestDTO, Pedagogic.class);

        Pedagogic pedagogicSaved = repository.save(pedagogic);
        kafkaEventSender.sendEvent(pedagogicSaved, "POST", "Pedagogic created");
        pedagogicSaved.setCustomization(customizationService.setDefault(pedagogicSaved));

        return modelMapper.map(pedagogicSaved, PedagogicResponseDTO.class);
    }

    public PedagogicResponseDTO findPedagogic(Long id) {
        Pedagogic pedagogicFound = findPedagogicEntity(id);

        return modelMapper.map(pedagogicFound, PedagogicResponseDTO.class);
    }

    public Pedagogic findPedagogicEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException("Pedagogic user not found"));
    }

    public PedagogicResponseDTO updatePedagogic(PedagogicRequestDTO pedagogicRequestDTO, Long id) {
        Pedagogic pedagogic = findPedagogicEntity(id);
        modelMapper.map(pedagogicRequestDTO, pedagogic);
        Pedagogic updatedPedagogic = repository.save(pedagogic);
        kafkaEventSender.sendEvent(updatedPedagogic, "PUT", "Pedagogic updated");
        return modelMapper.map(updatedPedagogic, PedagogicResponseDTO.class);
    }

    public PedagogicResponseDTO disablePedagogic(Long id) {
        Pedagogic pedagogic = findPedagogicEntity(id);
        pedagogic.setEnabled(false);
        repository.save(pedagogic);
        kafkaEventSender.sendEvent(pedagogic, "DELETE", "Pedagogic disabled");
        return modelMapper.map(pedagogic, PedagogicResponseDTO.class);
    }

}
