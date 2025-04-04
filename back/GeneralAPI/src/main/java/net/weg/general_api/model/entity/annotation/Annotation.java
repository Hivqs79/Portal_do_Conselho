package net.weg.general_api.model.entity.annotation;

import jakarta.persistence.*;
import lombok.Data;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.model.enums.RankENUM;

import java.time.LocalDateTime;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Annotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private RankENUM rank;

    @Column(nullable = false)
    private boolean enabled;

    private String strengths;
    private String toImprove;

    @ManyToOne
    private Council council;

    @ManyToOne
    private Teacher teacher;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    @PrePersist
    public void onPrePersist() {
        this.setCreateDate(LocalDateTime.now());
        this.setUpdateDate(LocalDateTime.now());
        this.setEnabled(true);
    }

    @PreUpdate
    public void onPreUpdate() {
        this.setUpdateDate(LocalDateTime.now());
    }

    @Override
    public String toString() {
        return "Annotation{" +
                "id=" + id +
                ", rank='" + rank + '\'' +
                ", strengths='" + strengths + '\'' +
                ", toImprove='" + toImprove + '\'' +
                ", council=" + council.getId() +
                ", teacher=" + teacher.getName() +
                '}';
    }
}
