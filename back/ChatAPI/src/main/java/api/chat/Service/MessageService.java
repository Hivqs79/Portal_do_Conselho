package api.chat.Service;

import api.chat.Entities.Dto.MessageDto;
import api.chat.Entities.Message;
import api.chat.Repositorys.MessageRepository;
import api.chat.Service.kafka.KafkaProducerService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import org.modelmapper.ModelMapper;


@Service
@AllArgsConstructor
public class MessageService {

    private final MessageRepository repository;
    private final UserService userService;
    @Lazy
    @Autowired
    private RoomConversationService roomConversationService;

    private KafkaProducerService kafkaProducerService;
    private final ObjectMapper objectMapper;



    public Message sendMessage(MessageDto dto) throws JsonProcessingException {
        Message message = dto.conversorMessage(userService, roomConversationService);
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
