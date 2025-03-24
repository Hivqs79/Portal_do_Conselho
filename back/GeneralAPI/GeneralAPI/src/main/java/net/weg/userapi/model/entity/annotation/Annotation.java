package net.weg.userapi.model.entity.annotation;

import jakarta.persistence.*;
import lombok.Data;
import net.weg.userapi.model.entity.council.Council;
import net.weg.userapi.model.entity.users.Teacher;

import java.time.LocalDateTime;
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
