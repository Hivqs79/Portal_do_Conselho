package net.weg.userapi.model.entity.users;

import jakarta.persistence.*;
import lombok.Data;
import net.weg.userapi.model.entity.feedback.FeedbackUser;

import java.util.List;
import java.util.UUID;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;

    @Column(nullable = true)
    private UUID imageKey;

    @OneToMany(mappedBy = "user")
    private List<FeedbackUser> feedbackUsers;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", imageKey=" + imageKey +
                '}';
    }
}
