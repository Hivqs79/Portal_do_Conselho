package net.weg.userapi.model.entity.feedback;

import jakarta.persistence.*;
import lombok.Data;
import net.weg.userapi.model.entity.council.Council;

import java.time.LocalDateTime;

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
        return "Feedback{" +
                "id=" + id +
                ", rank='" + rank + '\'' +
                ", council=" + council.getId() +
                ", strengths='" + strengths + '\'' +
                ", toImprove='" + toImprove + '\'' +
                '}';
    }
}
