package api.chat.entities.dto;

import api.chat.entities.Message;
import api.chat.service.RoomConversationService;
import lombok.*;

import java.time.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 * @author Pedro Henrique Panstein
 */
public class MessageDto {

    private String content;
    private Long senderId;
    private Long roomId;

    public Message conversorMessage (RoomConversationService roomConversationService){
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("America/Sao_Paulo"));
        LocalDate nowDate = now.toLocalDate();
        LocalTime nowTime = now.toLocalTime();

        return Message.builder()
                .roomConversation(roomConversationService.findById(roomId))
                .senderId(this.senderId)
                .content(this.content)
                .currentTimeDate(nowDate.atTime(nowTime))
                .build();

    }
}
