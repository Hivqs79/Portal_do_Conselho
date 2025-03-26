package api.chat.Entities.Dto;

import api.chat.Entities.Message;
import api.chat.Entities.RoomConversation;
import api.chat.Repositorys.UserRepository;
import api.chat.Service.RoomConversationService;
import api.chat.Service.UserService;
import lombok.*;

import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
