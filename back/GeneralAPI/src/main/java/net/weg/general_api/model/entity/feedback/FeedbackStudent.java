package net.weg.general_api.model.entity.feedback;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.enums.RankENUM;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "feedback_id")
public class FeedbackStudent extends Feedback {

    @Enumerated(EnumType.STRING)
    @Column(name = "rank_classification", nullable = false)
    private RankENUM rank;

    @ManyToOne
    private Student student;

    @Column(nullable = false)
    private Double frequency;

    @Column(nullable = false)
    private boolean isViewed;

    @Column(nullable = false)
    private boolean isSatisfied;

    @Override
    public String toString() {
        return "FeedbackStudent{" +
                "student=" + student.getName() +
                ", frequency=" + frequency +
                ", isViewed=" + isViewed +
                ", isSatisfied=" + isSatisfied +
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
