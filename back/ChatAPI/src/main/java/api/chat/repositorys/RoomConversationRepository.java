package api.chat.repositorys;

import api.chat.entities.RoomConversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
/**
 * @author Vinícius Eduardo dos Santos
 * @author Pedro Henrique Panstein
 */
public interface RoomConversationRepository extends JpaRepository<RoomConversation, Long> {
    List<RoomConversation> findByUsersIdContaining(Long userId);

    @Query("SELECT rc FROM RoomConversation rc WHERE :user1 MEMBER OF rc.usersId AND :user2 MEMBER OF rc.usersId AND SIZE(rc.usersId) = 2")
    Optional<RoomConversation> findRoomByTwoUsers(@Param("user1") Long user1, @Param("user2") Long user2);
}
