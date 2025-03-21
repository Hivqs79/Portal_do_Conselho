package net.weg.userapi.model.dto.response.council;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.classes.ClassResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CouncilResponseDTO {

    private Integer id;
    private LocalDate date;
    private LocalTime time;

    private ClassResponseDTO aClass;

    private List<TeacherResponseDTO> teachers;


}
