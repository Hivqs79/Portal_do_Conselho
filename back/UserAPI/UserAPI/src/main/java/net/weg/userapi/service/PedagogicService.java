package net.weg.userapi.service;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.UserNotFoundException;
import net.weg.userapi.model.dto.request.users.PedagogicRequestDTO;
import net.weg.userapi.model.dto.response.users.PedagogicResponseDTO;
import net.weg.userapi.model.entity.users.Pedagogic;
import net.weg.userapi.repository.PedagogicRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class PedagogicService {

    private PedagogicRepository repository;
    private ModelMapper modelMapper;

    public PedagogicResponseDTO createPedagogic(PedagogicRequestDTO pedagogicRequestDTO) {
        Pedagogic pedagogic = modelMapper.map(pedagogicRequestDTO, Pedagogic.class);
        Pedagogic pedagogicSaved = repository.save(pedagogic);

        return modelMapper.map(pedagogicSaved, PedagogicResponseDTO.class);
    }

    public PedagogicResponseDTO findPedagogic(Integer id) {
        Pedagogic pedagogicFound = findPedagogicEntity(id);

        return modelMapper.map(pedagogicFound, PedagogicResponseDTO.class);
    }

    public Pedagogic findPedagogicEntity(Integer id) {
        return repository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public Page<PedagogicResponseDTO> pagePedagogic(Pageable pageable) {
        Page<Pedagogic> pedagogicPage = repository.findAll(pageable);

        return pedagogicPage.map(pedagogic -> modelMapper.map(pedagogic, PedagogicResponseDTO.class));
    }

    public PedagogicResponseDTO updatePedagogic(PedagogicRequestDTO pedagogicRequestDTO, Integer id) {
        Pedagogic pedagogic = findPedagogicEntity(id);
        modelMapper.map(pedagogicRequestDTO, pedagogic);
        Pedagogic updatedPedagogic = repository.save(pedagogic);
        return modelMapper.map(updatedPedagogic, PedagogicResponseDTO.class);
    }

    public PedagogicResponseDTO deletePedagogic(Integer id) {
        Pedagogic pedagogic = findPedagogicEntity(id);
        repository.delete(pedagogic);
        return modelMapper.map(pedagogic, PedagogicResponseDTO.class);
    }

    public void mockarPedagogic (List<PedagogicRequestDTO> pedagogicRequestDTOS) {
        List<Pedagogic> pedagogics = pedagogicRequestDTOS.stream().map(pedagogicRequestDTO -> modelMapper.map(pedagogicRequestDTO, Pedagogic.class)).collect(Collectors.toList());
        repository.saveAll(pedagogics);
    }
}
