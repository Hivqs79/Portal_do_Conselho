package net.weg.userapi.model.dto.request.council;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CouncilRequestDTO {

    @NotNull(message = "{not.null.message}")
    private LocalDate date;
    @NotNull(message = "{not.null.message}")
    private LocalTime time;
    @NotNull(message = "{not.null.message}")
    private Integer class_id;

    private List<Integer> teachers_id;


}


