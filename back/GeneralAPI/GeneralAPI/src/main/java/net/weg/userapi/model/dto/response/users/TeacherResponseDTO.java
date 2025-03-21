package net.weg.userapi.model.dto.response.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.ClassResponseDTO;
import net.weg.userapi.model.entity.Class;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherResponseDTO {

    private Integer id;
    private String name;
    private String email;
}
