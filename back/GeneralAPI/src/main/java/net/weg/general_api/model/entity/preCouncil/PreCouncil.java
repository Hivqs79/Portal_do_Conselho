package net.weg.general_api.model.entity.preCouncil;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.users.Teacher;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Entity
@Table(name = "preCouncil")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PreCouncil {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Class aClass;

    @OneToMany(mappedBy = "preCouncil")
    private List<PreCouncilSection> preCouncilSectionList;

    @ManyToMany
    private List<Teacher> teachers;

    @Column(nullable = false)
    private boolean answered;

    @Column(nullable = false)
    private LocalDateTime startDateTime;

    @Column(nullable = false)
    private LocalDateTime finalDateTime;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    @Column(nullable = false)
    private boolean enabled;

    @PrePersist
    public void onPrePersist() {
        this.setAnswered(false);
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
        return "PreCouncil{" +
                "id=" + id +
                ", class=" + aClass.getId() +
                ", preCouncilSectionList=" + preCouncilSectionList +
                '}';
    }
}
