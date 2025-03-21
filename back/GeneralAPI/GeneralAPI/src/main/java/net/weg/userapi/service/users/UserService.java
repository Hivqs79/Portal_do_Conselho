package net.weg.userapi.service.users;

import lombok.AllArgsConstructor;
import net.weg.userapi.exception.exceptions.UserNotFoundException;
import net.weg.userapi.model.entity.feedback.FeedbackClass;
import net.weg.userapi.model.entity.users.User;
import net.weg.userapi.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository repository;

    public User findUserEntity(Integer id) {
        return repository.findById(id).orElseThrow(() -> new UserNotFoundException("User entity not found"));
    }

}
