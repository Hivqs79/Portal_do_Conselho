package net.weg.userapi.model.dto.request.preCouncil;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.entity.council.Council;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PreCouncilRequestDTO {

    @NotNull
    private Integer council_id;

}
