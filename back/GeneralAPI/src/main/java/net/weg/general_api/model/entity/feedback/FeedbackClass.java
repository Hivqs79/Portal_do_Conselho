package net.weg.general_api.model.entity.feedback;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.enums.RankENUM;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "feedback_id")
public class FeedbackClass extends Feedback {
    @Enumerated(EnumType.STRING)
    @Column(name = "rank_classification", nullable = false)
    private RankENUM rank;

    @PrePersist
    public void onPrePersist() {
        this.setCreateDate(LocalDateTime.now());
        this.setUpdateDate(LocalDateTime.now());
        this.setReturned(false);
        this.setEnabled(true);
    }

    @Override
    public String toString() {
        return "FeedbackClass{" +
                "rank=" + rank +
                "class=" + super.getCouncil().getAClass().getName() +
                '}';
    }
}
