package net.weg.general_api.service.users;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.UserNotFoundException;
import net.weg.general_api.model.entity.users.User;
import net.weg.general_api.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository repository;

    public User findUserEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException("User entity not found"));
    }

}
