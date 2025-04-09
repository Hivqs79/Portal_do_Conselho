package net.weg.general_api.model.entity.council;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.annotation.Annotation;
import net.weg.general_api.model.entity.feedback.Feedback;
import net.weg.general_api.model.entity.preCouncil.PreCouncil;
import net.weg.general_api.model.entity.users.Teacher;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Entity
@Table(name = "council")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Council {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime startDateTime;

    @ManyToOne(fetch = FetchType.EAGER)
    private Class aClass;

    @Column(nullable = false)
    private boolean enabled;

    @Column(nullable = false)
    private boolean isHappening;

    @Column(nullable = false)
    private boolean isFinished;

    @OneToMany(mappedBy = "council")
    private List<Annotation> annotations;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "council_teacher",
            joinColumns = @JoinColumn(name = "council_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id")
    )
    private List<Teacher> teachers;

    @OneToMany(mappedBy = "council")
    private List<Feedback> feedbacks;

    @OneToOne(mappedBy = "council")
    private PreCouncil preCouncil;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    @PrePersist
    public void onPrePersist() {
        this.setCreateDate(LocalDateTime.now());
        this.setUpdateDate(LocalDateTime.now());
        this.setHappening(false);
        this.setEnabled(true);
        this.setFinished(false);
    }

    @PreUpdate
    public void onPreUpdate() {
        this.setUpdateDate(LocalDateTime.now());
    }

    @Override
    public String toString() {
        return "Council{" +
                "id=" + id +
                ", aClass=" + aClass +
                ", startDateTime=" + startDateTime +
                ", teachers=" + teachers +
                ", preCouncil=" + preCouncil +
                ", isHappening=" + isHappening +
                '}';
    }
}
