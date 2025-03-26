package net.weg.userapi.model.dto.request.preCouncil;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PreCouncilRequestDTO {

    @NotNull(message = "{not.null.message}")
    private Long council_id;

}
