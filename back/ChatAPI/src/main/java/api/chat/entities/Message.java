package api.chat.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
/**
 * @author Vinícius Eduardo dos Santos
 */
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDateTime currentTimeDate;
    private Long senderId;
    @ManyToOne
    @JoinColumn(name = "room_conversation_id")
    private RoomConversation roomConversation;

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", currentTimeDate=" + currentTimeDate +
                ", senderId=" + senderId +
                ", roomConversation=" + roomConversation +
                '}';
    }
}
