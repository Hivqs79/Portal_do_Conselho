package net.weg.userapi.model.dto.response.preCouncil;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.council.CouncilResponseDTO;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreCouncilResponseDTO {

    private Long id;
    private CouncilResponseDTO council;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
