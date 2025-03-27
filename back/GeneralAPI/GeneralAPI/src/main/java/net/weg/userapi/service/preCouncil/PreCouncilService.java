package net.weg.userapi.service.preCouncil;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.PreCouncilNotFoundException;
import net.weg.userapi.model.dto.request.preCouncil.PreCouncilRequestDTO;
import net.weg.userapi.model.dto.response.preCouncil.PreCouncilResponseDTO;
import net.weg.userapi.model.entity.preCouncil.PreCouncil;
import net.weg.userapi.repository.PreCouncilRepository;
import net.weg.userapi.service.council.CouncilService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PreCouncilService {

    private PreCouncilRepository repository;
    private CouncilService councilService;
    private ModelMapper modelMapper;

    public Page<PreCouncilResponseDTO> findPreCouncilSpec(Specification<PreCouncil> spec, Pageable pageable) {
        Page<PreCouncil> preCouncils = repository.findAll(spec, pageable);
        return preCouncils.map(preCouncil -> modelMapper.map(preCouncil, PreCouncilResponseDTO.class));
    }

    public PreCouncilResponseDTO createPreCouncil(PreCouncilRequestDTO preCouncilRequestDTO) {
        PreCouncil preCouncil = modelMapper.map(preCouncilRequestDTO, PreCouncil.class);

        preCouncil.setCouncil(councilService.findCouncilEntity(preCouncilRequestDTO.getCouncil_id())); //SETAR CONSELHO

        PreCouncil preCouncilSaved = repository.save(preCouncil);

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

        preCouncil.setCouncil(councilService.findCouncilEntity(preCouncilRequestDTO.getCouncil_id())); //SETAR CONSELHO

        PreCouncil updatedPreCouncil = repository.save(preCouncil);
        return modelMapper.map(updatedPreCouncil, PreCouncilResponseDTO.class);
    }

    public PreCouncilResponseDTO disablePreCouncil(Long id) {
        PreCouncil preCouncil = findPreCouncilEntity(id);
        preCouncil.setEnabled(false);
        repository.save(preCouncil);
        return modelMapper.map(preCouncil, PreCouncilResponseDTO.class);
    }

}
