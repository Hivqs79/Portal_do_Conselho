package net.weg.userapi.model.entity.feedback;

import jakarta.persistence.*;
import net.weg.userapi.model.enums.RankENUM;

import java.time.LocalDateTime;

@Entity
@PrimaryKeyJoinColumn(name = "feedback_id")
public class FeedbackClass extends Feedback {
    @Enumerated(EnumType.STRING)
    private RankENUM rank;

    @PrePersist
    public void onPrePersist() {
        this.setCreateDate(LocalDateTime.now());
        this.setUpdateDate(LocalDateTime.now());
    }

    @Override
    public String toString() {
        return "FeedbackClass{" +
                "rank=" + rank +
                "class=" + super.getCouncil().getAClass().getName() +
                '}';
    }
}
