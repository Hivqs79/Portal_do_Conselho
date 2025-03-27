package api.chat.repositorys;

import api.chat.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
/**
 * @author Vinícius Eduardo dos Santos
 */
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findAllByRoomConversation_Id(Long RoomId);

}
