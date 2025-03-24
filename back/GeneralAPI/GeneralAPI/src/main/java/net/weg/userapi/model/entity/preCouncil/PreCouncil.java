package net.weg.userapi.model.entity.preCouncil;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.entity.council.Council;

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
    private Integer id;

    @OneToOne
    private Council council;

    @OneToMany(mappedBy = "preCouncil")
    private List<PreCouncilSection> preCouncilSectionList;

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
        return "PreCouncil{" +
                "id=" + id +
                ", council=" + council.getId() +
                ", preCouncilSectionList=" + preCouncilSectionList +
                '}';
    }
}
