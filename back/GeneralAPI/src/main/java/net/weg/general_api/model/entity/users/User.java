package net.weg.general_api.model.entity.users;

import jakarta.persistence.*;
import lombok.Data;
import net.weg.general_api.model.entity.feedback.FeedbackUser;

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

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    @OneToOne(mappedBy = "user")
    private Customization customization;

    @Column(nullable = false)
    private boolean enabled;

    @OneToMany(mappedBy = "user")
    private List<FeedbackUser> feedbackUsers;

    @OneToOne
    private UserAuthentication userAuthentication;

    @PrePersist
    public void onPrePersist() {
        this.setCreateDate(LocalDateTime.now());
        this.setUpdateDate(LocalDateTime.now());
        this.setEnabled(true);
    }

    @PreUpdate
    public void onPreUpdate() {
        this.setUpdateDate(LocalDateTime.now());
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", userAuth='" + userAuthentication + '\'' +
                '}';
    }
}
