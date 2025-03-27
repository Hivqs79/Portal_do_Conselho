package api.chat.repositorys;

import api.chat.entities.RoomConversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
/**
 * @author Vinícius Eduardo dos Santos
 */
public interface RoomConversationRepository extends JpaRepository<RoomConversation, Long> {
}
