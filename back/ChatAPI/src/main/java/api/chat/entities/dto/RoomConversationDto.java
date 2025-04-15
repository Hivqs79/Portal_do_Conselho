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
 * @author Pedro Henrique Panstein
 */
public class RoomConversationDto {

    private List<Long> usersId;

    public RoomConversation convert() {
        return RoomConversation.builder()
                .usersId(this.usersId)
                .build();
    }

}
