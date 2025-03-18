package net.weg.userapi.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassResponseDTO {

    private Integer id;
    private String name;
    private String area;
    private String course;
}
