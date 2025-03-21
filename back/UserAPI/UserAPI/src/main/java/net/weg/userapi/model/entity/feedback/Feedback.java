package net.weg.userapi.model.entity.feedback;

import jakarta.persistence.*;
import lombok.Data;
import net.weg.userapi.model.entity.council.Council;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String rank;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Council council;

    @Column(nullable = false)
    private String strengths;

    @Column(nullable = false)
    private String toImprove;

    @Override
    public String toString() {
        return "Feedback{" +
                "id=" + id +
                ", rank='" + rank + '\'' +
                ", council=" + council.getId() +
                ", strengths='" + strengths + '\'' +
                ", toImprove='" + toImprove + '\'' +
                '}';
    }
}
