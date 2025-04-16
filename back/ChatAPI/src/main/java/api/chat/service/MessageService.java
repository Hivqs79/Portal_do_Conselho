package api.chat.service;

import api.chat.entities.dto.MessageDto;
import api.chat.entities.Message;
import api.chat.repositorys.MessageRepository;
import api.chat.service.kafka.KafkaEventSender;
import api.chat.service.kafka.KafkaMessage;
import api.chat.service.kafka.KafkaProducerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 * @author Pedro Henrique Panstein
 */
public class MessageService {

    private final MessageRepository repository;
    @Lazy
    @Autowired
    private RoomConversationService roomConversationService;

    private final KafkaEventSender kafkaEventSender;
    private final ObjectMapper objectMapper;



    public Message sendMessage(MessageDto dto) throws JsonProcessingException {
        Message message = dto.conversorMessage(roomConversationService);
        message = repository.save(message);
        kafkaEventSender.sendEvent(objectMapper.writeValueAsString(message),"POST", "Sending a message","room" + message.getRoomConversation().getId());
        return message;
    }

    public void deleteMessage(Long idMessage) throws JsonProcessingException {
        Message message = findMessageById(idMessage);
        //kafkaEventSender.sendEvent(objectMapper.writeValueAsString(message),"DELETE", "Deleting a message");
        repository.deleteById(idMessage);
    }

    public Message findMessageById(Long idMessage){
        Optional<Message> message = repository.findById(idMessage);
        return message.get();
    }

    public List<Message> findMessagesByIdRoom(Long roomId){
        Optional<List<Message>> messages = Optional.ofNullable(repository.findAllByRoomConversation_Id(roomId));
        return messages.get();
    }

    public Message findLastMessageByRoomId(Long roomId) {
        return repository.findFirstByRoomConversationIdOrderByCurrentTimeDateDesc(roomId);
    }
}