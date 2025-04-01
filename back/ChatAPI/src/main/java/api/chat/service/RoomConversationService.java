package api.chat.service;

import api.chat.entities.dto.RoomConversationDto;
import api.chat.entities.RoomConversation;
import api.chat.repositorys.RoomConversationRepository;
import api.chat.service.kafka.KafkaEventSender;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 */
public class RoomConversationService {

    private MessageService messageService;
    private RoomConversationRepository repositoryRoom;
    private KafkaEventSender kafkaEventSender;

    public RoomConversation register(RoomConversationDto dto){
        RoomConversation room = dto.convert(messageService);
        room = repositoryRoom.save(room);
        kafkaEventSender.sendEvent(room, "POST", "Creating a conversation room");
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
        kafkaEventSender.sendEvent(roomConversation, "DELETE", "Deleting a conversation room");

        repositoryRoom.deleteById(id);
    }
}
