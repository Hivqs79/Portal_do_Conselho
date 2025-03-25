package net.weg.userapi.service.users;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.UserNotFoundException;
import net.weg.userapi.model.dto.request.users.PedagogicRequestDTO;
import net.weg.userapi.model.dto.response.users.AdminResponseDTO;
import net.weg.userapi.model.dto.response.users.PedagogicResponseDTO;
import net.weg.userapi.model.entity.users.Admin;
import net.weg.userapi.model.entity.users.Pedagogic;
import net.weg.userapi.repository.PedagogicRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class PedagogicService {

    private PedagogicRepository repository;
    private CustomizationService customizationService;
    private ModelMapper modelMapper;

    public Page<PedagogicResponseDTO> findPedagogicSpec(Specification<Pedagogic> spec, Pageable pageable) {
        Page<Pedagogic> pedagogics = repository.findAll(spec, pageable);
        return pedagogics.map(pedagogic -> modelMapper.map(pedagogic, PedagogicResponseDTO.class));
    }
    public PedagogicResponseDTO createPedagogic(PedagogicRequestDTO pedagogicRequestDTO) {
        Pedagogic pedagogic = modelMapper.map(pedagogicRequestDTO, Pedagogic.class);
        Pedagogic pedagogicSaved = repository.save(pedagogic);
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

    public Page<PedagogicResponseDTO> pagePedagogic(Pageable pageable) {
        Page<Pedagogic> pedagogicPage = repository.findAll(pageable);

        return pedagogicPage.map(pedagogic -> modelMapper.map(pedagogic, PedagogicResponseDTO.class));
    }

    public PedagogicResponseDTO updatePedagogic(PedagogicRequestDTO pedagogicRequestDTO, Long id) {
        Pedagogic pedagogic = findPedagogicEntity(id);
        modelMapper.map(pedagogicRequestDTO, pedagogic);
        Pedagogic updatedPedagogic = repository.save(pedagogic);
        return modelMapper.map(updatedPedagogic, PedagogicResponseDTO.class);
    }

    public PedagogicResponseDTO deletePedagogic(Long id) {
        Pedagogic pedagogic = findPedagogicEntity(id);
        PedagogicResponseDTO pedagogicResponseDTO = modelMapper.map(pedagogic, PedagogicResponseDTO.class);
        repository.delete(pedagogic);
        return pedagogicResponseDTO;
    }

    public void mockarPedagogic (List<PedagogicRequestDTO> pedagogicRequestDTOS) {
        List<Pedagogic> pedagogics = pedagogicRequestDTOS.stream().map(pedagogicRequestDTO -> modelMapper.map(pedagogicRequestDTO, Pedagogic.class)).collect(Collectors.toList());
        repository.saveAll(pedagogics);
    }
}
