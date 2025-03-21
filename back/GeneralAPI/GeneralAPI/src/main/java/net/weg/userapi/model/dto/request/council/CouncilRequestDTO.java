package net.weg.userapi.model.dto.request.council;

import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.entity.Class;
import net.weg.userapi.model.entity.users.Teacher;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CouncilRequestDTO {

    @NotNull
    private LocalDate date;
    @NotNull
    private LocalTime time;
    @NotNull
    private Integer class_id;

    private List<Integer> teachers_id;


}


