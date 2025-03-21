package net.weg.userapi.model.entity.feedback;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name = "feedback_id")
public class FeedbackClass extends Feedback {

    @Override
    public String toString() {
        return super.toString() + "\nFeedbackClass{}";
    }
}
