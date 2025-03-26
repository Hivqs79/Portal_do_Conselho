package api.chat.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
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
    private List<Message> messages;
}
