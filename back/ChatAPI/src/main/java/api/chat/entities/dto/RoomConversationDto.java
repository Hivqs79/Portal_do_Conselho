package api.chat.entities.dto;

import api.chat.entities.Message;
import api.chat.entities.RoomConversation;
import api.chat.service.MessageService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 */
public class RoomConversationDto {

    private Long id;
    private List<Long> usersId;
    private List<Message> messagesList;

    public RoomConversation convert(MessageService messageService) {

        return RoomConversation.builder()
            .usersId(this.usersId)
            .messages(messageService.findMessagesByIdRoom(id))
            .build();
    }

}
