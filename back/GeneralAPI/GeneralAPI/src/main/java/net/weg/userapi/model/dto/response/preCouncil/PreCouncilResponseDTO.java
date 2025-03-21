package net.weg.userapi.model.dto.response.preCouncil;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.council.CouncilResponseDTO;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreCouncilResponseDTO {

    private Integer id;
    private CouncilResponseDTO council;
}
