package net.weg.general_api.model.entity.feedback;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.entity.users.User;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "feedback_id")
public class FeedbackUser extends Feedback {

    @ManyToOne
    private User user;

    @Column(nullable = false)
    private boolean isViewed;

    @Column(nullable = false)
    private boolean isSatisfied;

    @Override
    public String toString() {
        return "FeedbackUser{" +
                "user=" + user.getName() +
                ", isViewed=" + isViewed +
                ", isSatisfied=" + isSatisfied +
                '}';
    }

    @PrePersist
    public void onPrePersist() {
        this.setCreateDate(LocalDateTime.now());
        this.setUpdateDate(LocalDateTime.now());
        this.setViewed(false);
        this.setSatisfied(false);
        this.setEnabled(true);
    }

}
