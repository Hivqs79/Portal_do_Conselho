package net.weg.userapi.model.entity.preCouncil;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Table(name = "preCouncilSection")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PreCouncilSection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private PreCouncil preCouncil;

    @Column(nullable = false)
    private String topic;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String strengths;
    @Column(nullable = false)
    private String toImprove;

    @Override
    public String toString() {
        return "PreCouncilSection{" +
                "id=" + id +
                ", topic='" + topic + '\'' +
                ", description='" + description + '\'' +
                ", strengths='" + strengths + '\'' +
                ", toImprove='" + toImprove + '\'' +
                '}';
    }
}
