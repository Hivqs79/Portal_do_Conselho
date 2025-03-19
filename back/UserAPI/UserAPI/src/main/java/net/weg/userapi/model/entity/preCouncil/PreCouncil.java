package net.weg.userapi.model.entity.preCouncil;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.entity.council.Council;

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

}
