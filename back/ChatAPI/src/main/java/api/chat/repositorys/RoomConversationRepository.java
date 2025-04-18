package api.chat.repositorys;

import api.chat.entities.RoomConversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
/**
 * @author Vinícius Eduardo dos Santos
 * @author Pedro Henrique Panstein
 */
public interface RoomConversationRepository extends JpaRepository<RoomConversation, Long> {
    List<RoomConversation> findByUsersIdContaining(Long userId);
}
