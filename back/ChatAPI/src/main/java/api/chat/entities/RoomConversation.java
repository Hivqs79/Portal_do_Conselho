package api.chat.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

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

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "room_user",
            joinColumns = @JoinColumn(name = "id_room"),
            inverseJoinColumns = @JoinColumn(name = "id_user")
    )
    private List<User> users;

//    @ManyToOne
//    @JoinColumn(name = "user1")
//    private User user1;
//
//    @ManyToOne
//    @JoinColumn(name = "user2")
//    private User user2;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "roomConversation")
    @JsonIgnore
    @ToString.Exclude
    private List<Message> messages;
}
