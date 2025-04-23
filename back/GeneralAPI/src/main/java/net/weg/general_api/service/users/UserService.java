package net.weg.general_api.service.users;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.dto.response.users.UserResponseDTO;
import net.weg.general_api.model.entity.users.User;
import net.weg.general_api.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final ModelMapper modelMapper;

    public User findUserEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException("User entity not found"));
    }

    public UserResponseDTO findUser(Long id) {
        return modelMapper.map(findUserEntity(id), UserResponseDTO.class);
    }

}
