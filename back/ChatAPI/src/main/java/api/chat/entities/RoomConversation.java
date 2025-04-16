package api.chat.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
/**
 * @author Vinícius Eduardo dos Santos
 * @author Pedro Henrique Panstein
 */

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomConversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    private List<Long> usersId;
}
