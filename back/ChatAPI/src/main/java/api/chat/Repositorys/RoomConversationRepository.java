package api.chat.Repositorys;

import api.chat.Entities.RoomConversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomConversationRepository extends JpaRepository<RoomConversation, Long> {
}
