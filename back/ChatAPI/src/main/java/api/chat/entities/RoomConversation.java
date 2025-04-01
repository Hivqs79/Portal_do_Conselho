package api.chat.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
/**
 * @author Vinícius Eduardo dos Santos
 */
public class RoomConversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ElementCollection
    private List<Long> usersId;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "roomConversation")
    @JsonIgnore
    @ToString.Exclude
    private List<Message> messages;
}
