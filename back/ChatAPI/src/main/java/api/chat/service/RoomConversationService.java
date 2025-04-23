package api.chat.service;

import api.chat.entities.dto.RoomConversationDto;
import api.chat.entities.RoomConversation;
import api.chat.repositorys.RoomConversationRepository;
import api.chat.service.kafka.KafkaEventSender;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 * @author Pedro Henrique Panstein
 */
public class RoomConversationService {

    private MessageService messageService;
    private RoomConversationRepository repositoryRoom;
    private final ObjectMapper objectMapper;
    private KafkaEventSender kafkaEventSender;

    public RoomConversation register(RoomConversationDto dto) throws JsonProcessingException {
        RoomConversation room = dto.convert();
        room = repositoryRoom.save(room);

        // Envia evento para o Kafka
        Map<String, Object> roomEvent = new HashMap<>();
        roomEvent.put("type", "room_created");
        roomEvent.put("room", room);
        roomEvent.put("usersId", room.getUsersId());

        kafkaEventSender.sendEvent(
                objectMapper.writeValueAsString(roomEvent),
                "POST",
                "New chat room created",
                "room_events"
        );

        return room;
    }

    public List<RoomConversation> findAll(){
        return repositoryRoom.findAll();
    }

    public RoomConversation findById(Long id){
        Optional<RoomConversation> optional = repositoryRoom.findById(id);
        return optional.get();
    }

    public void deleteById(Long id){
        RoomConversation roomConversation = this.findById(id);
        //kafkaEventSender.sendEvent(roomConversation, "DELETE", "Deleting a conversation room");

        repositoryRoom.deleteById(id);
    }

    public List<RoomConversation> findAllRoomsOfAUser(Long userId) {
        return repositoryRoom.findByUsersIdContaining(userId);
    }

    public Optional<RoomConversation> findRoomByTwoUsers(List<Long> userIds) {
        if (userIds.size() == 2) {
            Long user1 = userIds.get(0);
            Long user2 = userIds.get(1);

            return repositoryRoom.findRoomByTwoUsers(user1, user2);
        }

        return repositoryRoom.findAll().stream()
                .filter(room -> room.getUsersId().size() == userIds.size())
                .filter(room -> new HashSet<>(room.getUsersId()).containsAll(userIds))
                .findFirst();
    }
}
