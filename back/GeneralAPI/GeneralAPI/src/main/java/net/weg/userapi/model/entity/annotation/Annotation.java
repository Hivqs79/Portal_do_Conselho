package net.weg.userapi.model.entity.annotation;

import jakarta.persistence.*;
import lombok.Data;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.model.entity.users.Teacher;

import java.time.OffsetDateTime;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Annotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String rank;
    @Column(nullable = false)
    private String strengths;
    @Column(nullable = false)
    private String toImprove;
    @Column(nullable = false)
    private OffsetDateTime releaseDate;

    @ManyToOne
    private Council council;

    @ManyToOne
    private Teacher teacher;

    @Override
    public String toString() {
        return "Annotation{" +
                "id=" + id +
                ", rank='" + rank + '\'' +
                ", strengths='" + strengths + '\'' +
                ", toImprove='" + toImprove + '\'' +
                ", releaseDate=" + releaseDate +
                ", council=" + council.getId() +
                ", teacher=" + teacher.getName() +
                '}';
    }
}
