package api.chat.repositorys;

import api.chat.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
/**
 * @author Vinícius Eduardo dos Santos
 */
public interface UserRepository extends JpaRepository<User, Long> {
}
