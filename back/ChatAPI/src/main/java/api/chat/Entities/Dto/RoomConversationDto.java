package api.chat.Entities.Dto;

import api.chat.Entities.Message;
import api.chat.Entities.RoomConversation;
import api.chat.Entities.User;
import api.chat.Service.MessageService;
import api.chat.Service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
