package net.weg.userapi.service.preCouncil;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.preCouncil.PreCouncilRequestDTO;
import net.weg.userapi.model.dto.response.preCouncil.PreCouncilResponseDTO;
import net.weg.userapi.model.entity.preCouncil.PreCouncil;
import net.weg.userapi.repository.PreCouncilRepository;
import net.weg.userapi.service.council.CouncilService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class PreCouncilService {
    
    private PreCouncilRepository repository;
    private CouncilService councilService;
    private ModelMapper modelMapper;

    public PreCouncilResponseDTO createPreCouncil(PreCouncilRequestDTO preCouncilRequestDTO) {
        PreCouncil preCouncil = modelMapper.map(preCouncilRequestDTO, PreCouncil.class);

        preCouncil.setCouncil(councilService.findCouncilEntity(preCouncilRequestDTO.getCouncil_id())); //SETAR CONSELHO

        PreCouncil preCouncilSaved = repository.save(preCouncil);

        return modelMapper.map(preCouncilSaved, PreCouncilResponseDTO.class);
    }

    public PreCouncilResponseDTO findPreCouncil(Integer id) {
        PreCouncil preCouncil = findPreCouncilEntity(id);

        return modelMapper.map(preCouncil, PreCouncilResponseDTO.class);
    }

    public PreCouncil findPreCouncilEntity(Integer id) {
        return repository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Page<PreCouncilResponseDTO> pagePreCouncil(Pageable pageable) {
        Page<PreCouncil> preCouncil = repository.findAll(pageable);

        return preCouncil.map(annotation -> modelMapper.map(annotation, PreCouncilResponseDTO.class));
    }

    public PreCouncilResponseDTO updatePreCouncil(PreCouncilRequestDTO preCouncilRequestDTO, Integer id) {
        PreCouncil preCouncil = findPreCouncilEntity(id);
        modelMapper.map(preCouncilRequestDTO, preCouncil);

        preCouncil.setCouncil(councilService.findCouncilEntity(preCouncilRequestDTO.getCouncil_id())); //SETAR CONSELHO

        PreCouncil updatedPreCouncil = repository.save(preCouncil);
        return modelMapper.map(updatedPreCouncil, PreCouncilResponseDTO.class);
    }

    public PreCouncilResponseDTO deletePreCouncil(Integer id) {
        PreCouncil preCouncil = findPreCouncilEntity(id);
        PreCouncilResponseDTO preCouncilResponseDTO = modelMapper.map(preCouncil, PreCouncilResponseDTO.class);
        repository.delete(preCouncil);
        return preCouncilResponseDTO;
    }
    
}
