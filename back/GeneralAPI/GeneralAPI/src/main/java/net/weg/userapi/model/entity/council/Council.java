package net.weg.userapi.model.entity.council;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.model.entity.annotation.Annotation;
import net.weg.userapi.model.entity.feedback.Feedback;
import net.weg.userapi.model.entity.preCouncil.PreCouncil;
import net.weg.userapi.model.entity.users.Teacher;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
    private Integer id;

    private LocalDate date;
    private LocalTime time;

    @ManyToOne
    private Class aClass;

    @OneToMany(mappedBy = "council")
    private List<Annotation> annotations;

    @ManyToMany
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
    }

    @PreUpdate
    public void onPreUpdate() {
        this.setUpdateDate(LocalDateTime.now());
    }

    @Override
    public String toString() {
        return "Council{" +
                "id=" + id +
                ", date=" + date +
                ", time=" + time +
                ", aClass=" + aClass +
                ", teachers=" + teachers +
                ", preCouncil=" + preCouncil +
                '}';
    }
}
