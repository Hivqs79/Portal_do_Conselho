package api.chat.entities.dto;

import api.chat.entities.Message;
import api.chat.service.RoomConversationService;
import api.chat.service.UserService;
import lombok.*;

import java.time.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 */
public class MessageDto {

    private String content;
    private Long sender;
    private Long roomId;
    private LocalDateTime currentTimeDate;

    public Message conversorMessage (UserService userService, RoomConversationService roomConversationService){
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("America/Sao_Paulo"));
        LocalDate nowDate = now.toLocalDate();
        LocalTime nowTime = now.toLocalTime();

        return Message.builder()
                .roomConversation(roomConversationService.findbyId(roomId))
                .sender(userService.findbyId(sender))
                .content(this.content)
                .currentTimeDate(nowDate.atTime(nowTime))
                .build();

    }
}
