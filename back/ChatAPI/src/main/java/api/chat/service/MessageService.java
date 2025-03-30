package api.chat.service;

import api.chat.entities.dto.MessageDto;
import api.chat.entities.Message;
import api.chat.repositorys.MessageRepository;
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
 */
public class MessageService {

    private final MessageRepository repository;
    private final UserService userService;
    @Lazy
    @Autowired
    private RoomConversationService roomConversationService;

    private final KafkaProducerService kafkaProducerService;
    private final ObjectMapper objectMapper;



    public Message sendMessage(MessageDto dto) throws JsonProcessingException {
        Message message = dto.conversorMessage(userService, roomConversationService);
        System.out.println(objectMapper.writeValueAsString(message));
        kafkaProducerService.sendMessage("room" + message.getRoomConversation().getId(), objectMapper.writeValueAsString(message));
        return repository.save(message);
    }

    public void deleteMessage(Long idMessage){
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



}
