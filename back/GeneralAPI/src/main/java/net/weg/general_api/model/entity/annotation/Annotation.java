package net.weg.general_api.model.entity.annotation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.model.enums.RankENUM;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Annotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "rank_classification")
    private RankENUM rank;

    @Column(nullable = false)
    private boolean enabled;

    @Column(columnDefinition = "TEXT")
    private String strengths;

    @Column(columnDefinition = "TEXT")
    private String toImprove;

    @ManyToOne(fetch = FetchType.EAGER)
    private Council council;

    @ManyToOne
    private Teacher teacher;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    public Annotation(RankENUM rank, String strengths, String toImprove, Council council, Teacher teacher) {
        this.rank = rank;
        this.strengths = strengths;
        this.toImprove = toImprove;
        this.council = council;
        this.teacher = teacher;
    }

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
                ", council=" + (council != null ? council.getId() : "null") +
                ", teacher=" + (teacher != null ? teacher.getName() : "null") +
                '}';
    }
}
