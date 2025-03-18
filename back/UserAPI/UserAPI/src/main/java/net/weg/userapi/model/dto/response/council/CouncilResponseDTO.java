package net.weg.userapi.model.dto.response.council;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.ClassResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;
import net.weg.userapi.model.entity.users.Teacher;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CouncilResponseDTO {

    private LocalDate date;
    private LocalTime time;

    private ClassResponseDTO aClass;

    private List<TeacherResponseDTO> teachers;


}
