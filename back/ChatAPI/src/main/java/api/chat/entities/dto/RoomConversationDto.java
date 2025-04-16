package api.chat.entities.dto;

import api.chat.entities.RoomConversation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Vinícius Eduardo dos Santos
 * @author Pedro Henrique Panstein
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomConversationDto {

    private List<Long> usersId;

    public RoomConversation convert() {
        return RoomConversation.builder()
                .usersId(this.usersId)
                .build();
    }

}
