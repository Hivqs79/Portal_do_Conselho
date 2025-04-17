package net.weg.general_api.model.dto.request.preCouncil;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PreCouncilRequestDTO {

    @NotNull(message = "{not.null.message}")
    private Long class_id;

    private List<Long> teachers_id;

    @NotNull(message = "{not.null.message}")
    private LocalDateTime startDateTime;

    @NotNull(message = "{not.null.message}")
    private LocalDateTime finalDateTime;
}
