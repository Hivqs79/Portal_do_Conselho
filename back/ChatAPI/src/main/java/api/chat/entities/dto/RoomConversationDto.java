package api.chat.entities.dto;

import api.chat.entities.Message;
import api.chat.entities.RoomConversation;
import api.chat.entities.User;
import api.chat.service.MessageService;
import api.chat.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 */
public class RoomConversationDto {

    private Long id;
    private Long user1;
    private Long user2;
    private List<Message> messagesList;

    public RoomConversation conversorRoom(UserService userService, MessageService messageService) {
        List<User> users = new ArrayList<>();
        users.add(userService.findbyId(user1));
        users.add(userService.findbyId(user2));

        return RoomConversation.builder()
            .users(users)
            .messages(messageService.findMessagesByIdRoom(id))
            .build();
    }

}
