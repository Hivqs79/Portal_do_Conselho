package api.chat.service;

import api.chat.entities.User;
import api.chat.repositorys.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 */
public class UserService {

    private UserRepository repository;

    public User register(User user){
        return repository.save(user);
    }

    public List<User> findAll(){
        return repository.findAll();
    }

    public User findbyId(Long id){
        Optional<User> optional = repository.findById(id);
        return optional.get();
    }

    public User changeById(Long id, User user){
        user.setId(id);
        return repository.save(user);
    }

    public void deletById(Long id){
        repository.deleteById(id);
    }
}
