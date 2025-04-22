package net.weg.general_api.model.entity.feedback;

import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import net.weg.general_api.model.entity.council.Council;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class FeedbackWithCouncil extends Feedback {
    @ManyToOne
    private Council council;

}
