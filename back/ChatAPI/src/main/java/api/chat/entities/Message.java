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
    @ManyToOne
    @JoinColumn(name = "sender_user")
    private User sender;
    @ManyToOne
    @JoinColumn(name = "room_conversation_id")
    private RoomConversation roomConversation;

}
