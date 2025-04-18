package api.chat.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.*;

/**
 * @author Vinícius Eduardo dos Santos
 * @author Pedro Henrique Panstein
 */

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
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
