package net.weg.userapi.model.entity.feedback;

import jakarta.persistence.*;
import lombok.Data;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.model.enums.RankENUM;

import java.time.LocalDateTime;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Council council;

    @Column(nullable = false)
    private String strengths;

    @Column(nullable = false)
    private String toImprove;

    @Column(nullable = false)
    private boolean enabled;

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
                ", council=" + council.getId() +
                ", strengths='" + strengths + '\'' +
                ", toImprove='" + toImprove + '\'' +
                '}';
    }
}
