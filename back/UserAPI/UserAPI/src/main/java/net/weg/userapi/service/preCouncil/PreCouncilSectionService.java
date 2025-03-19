package net.weg.userapi.service.preCouncil;

import lombok.AllArgsConstructor;
import net.weg.userapi.model.dto.request.preCouncil.PreCouncilSectionRequestDTO;
import net.weg.userapi.model.dto.response.preCouncil.PreCouncilSectionResponseDTO;
import net.weg.userapi.model.entity.preCouncil.PreCouncilSection;
import net.weg.userapi.repository.PreCouncilSectionRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class PreCouncilSectionService {

    private PreCouncilSectionRepository repository;
    private ModelMapper modelMapper;
    private PreCouncilService preCouncilService;

    public PreCouncilSectionResponseDTO createPreCouncilSection(PreCouncilSectionRequestDTO preCouncilSectionRequestDTO) {
        PreCouncilSection preCouncilSection = modelMapper.map(preCouncilSectionRequestDTO, PreCouncilSection.class);

        preCouncilSection.setPreCouncil(preCouncilService.findPreCouncilEntity(preCouncilSectionRequestDTO.getPreCouncil_id()));

        PreCouncilSection preCouncilSectionSaved = repository.save(preCouncilSection);

        return modelMapper.map(preCouncilSectionSaved, PreCouncilSectionResponseDTO.class);
    }

    public PreCouncilSectionResponseDTO findPreCouncilSection(Integer id) {
        PreCouncilSection preCouncilSection = findPreCouncilSectionEntity(id);

        return modelMapper.map(preCouncilSection, PreCouncilSectionResponseDTO.class);
    }

    public PreCouncilSection findPreCouncilSectionEntity(Integer id) {
        return repository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Page<PreCouncilSectionResponseDTO> pagePreCouncilSection(Pageable pageable) {
        Page<PreCouncilSection> preCouncilSection = repository.findAll(pageable);

        return preCouncilSection.map(annotation -> modelMapper.map(annotation, PreCouncilSectionResponseDTO.class));
    }

    public PreCouncilSectionResponseDTO updatePreCouncilSection(PreCouncilSectionRequestDTO preCouncilSectionRequestDTO, Integer id) {
        PreCouncilSection preCouncilSection = findPreCouncilSectionEntity(id);
        modelMapper.map(preCouncilSectionRequestDTO, preCouncilSection);

        preCouncilSection.setPreCouncil(preCouncilService.findPreCouncilEntity(preCouncilSectionRequestDTO.getPreCouncil_id()));

        PreCouncilSection updatedPreCouncilSection = repository.save(preCouncilSection);
        return modelMapper.map(updatedPreCouncilSection, PreCouncilSectionResponseDTO.class);
    }

    public PreCouncilSectionResponseDTO deletePreCouncilSection(Integer id) {
        PreCouncilSection preCouncilSection = findPreCouncilSectionEntity(id);
        PreCouncilSectionResponseDTO preCouncilSectionResponseDTO = modelMapper.map(preCouncilSection, PreCouncilSectionResponseDTO.class);
        repository.delete(preCouncilSection);
        return preCouncilSectionResponseDTO;
    }
    
}
