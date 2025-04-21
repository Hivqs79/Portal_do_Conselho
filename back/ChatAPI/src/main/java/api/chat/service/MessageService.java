package api.chat.service;

import api.chat.entities.Notification;
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

import java.util.*;


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

        Map<String, Object> chatEvent = new HashMap<>();
        chatEvent.put("type", "chat_message");
        chatEvent.put("roomId", message.getRoomConversation().getId());
        chatEvent.put("message", message);

        System.out.println("veio daqui");

        kafkaEventSender.sendEvent(
                objectMapper.writeValueAsString(chatEvent),
                "POST",
                "New chat message",
                "chat_messages"
        );

        System.out.println("e chegou aqui");

        //List<Long> usersIds = message.getRoomConversation().getUsersId();
//
        //for (Long userId : usersIds) {
        //    if (!Objects.equals(userId, message.getSenderId())) {
        //        Notification notification = Notification.builder()
        //                .title("Você recebeu uma nova mensagem!")
        //                .message(message.getContent())
        //                .userId(userId)
        //                .build();
//
        //        kafkaEventSender.sendEvent(
        //                notification,
        //                "POST",
        //                "Mensagem enviada para usuario de id: ",
        //                "notification"
        //        );
        //    }
        //}

        return message;
    }

    public void deleteMessage(Long idMessage) throws JsonProcessingException {
        Message message = findMessageById(idMessage);
        kafkaEventSender.sendEvent(objectMapper.writeValueAsString(message), "DELETE", "Deleting a message");
        repository.deleteById(idMessage);
    }

    public Message findMessageById(Long idMessage) {
        Optional<Message> message = repository.findById(idMessage);
        return message.get();
    }

    public List<Message> findMessagesByIdRoom(Long roomId) {
        Optional<List<Message>> messages = Optional.ofNullable(repository.findAllByRoomConversation_Id(roomId));
        return messages.get();
    }

    public Message findLastMessageByRoomId(Long roomId) {
        return repository.findFirstByRoomConversationIdOrderByCurrentTimeDateDesc(roomId);
    }
}