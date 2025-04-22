package net.weg.general_api.model.entity.feedback;

import jakarta.persistence.*;
import lombok.Data;
import net.weg.general_api.model.entity.council.Council;

import java.time.LocalDateTime;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String strengths;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String toImprove;

    @Column(nullable = false)
    private boolean enabled;

    @Column(nullable = false)
    private boolean isReturned;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    @PreUpdate
    public void onPreUpdate() {
        this.setUpdateDate(LocalDateTime.now());
    }

    @Override
    public String toString() {
        return "Feedback{" +
                "id=" + id +
                ", strengths='" + strengths + '\'' +
                ", toImprove='" + toImprove + '\'' +
                ", isReturned='" + isReturned +
                '}';
    }
}
