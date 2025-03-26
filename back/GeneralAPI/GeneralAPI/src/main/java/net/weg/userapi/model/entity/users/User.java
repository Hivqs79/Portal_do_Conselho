package net.weg.userapi.model.entity.users;

import jakarta.persistence.*;
import lombok.Data;
import net.weg.userapi.model.entity.feedback.FeedbackStudent;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
//InheritanceType.SINGLE_TABLE = 1 table w/ all attributes
//InheritanceType.TABLE_PER_CLASS = 1 table per class
//InheritanceType.JOINED = 1 super table, and 1 table per subclass w/ FK
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    @OneToOne(mappedBy = "user")
    private Customization customization;

    @PrePersist
    public void onPrePersist() {
        this.setCreateDate(LocalDateTime.now());
        this.setUpdateDate(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        this.setUpdateDate(LocalDateTime.now());
    }

    @OneToMany(mappedBy = "user")
    private List<FeedbackStudent> feedbackStudents;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
