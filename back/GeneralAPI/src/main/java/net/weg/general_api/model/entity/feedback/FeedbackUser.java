package net.weg.general_api.model.entity.feedback;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.entity.preCouncil.PreCouncil;
import net.weg.general_api.model.entity.users.User;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "feedback_id")
public class FeedbackUser extends Feedback {

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @Column(nullable = false)
    private boolean isViewed;

    @Column(nullable = false)
    private boolean isSatisfied;

    @ManyToOne
    private PreCouncil preCouncil;

    @Override
    public String toString() {
        return "FeedbackUser{" +
                "user=" + user.getName() +
                ", isViewed=" + isViewed +
                ", isSatisfied=" + isSatisfied +
                ", preCouncil=" + preCouncil +
                '}';
    }

    @PrePersist
    public void onPrePersist() {
        this.setCreateDate(LocalDateTime.now());
        this.setUpdateDate(LocalDateTime.now());
        this.setReturned(false);
        this.setViewed(false);
        this.setSatisfied(false);
        this.setEnabled(true);
    }

}
