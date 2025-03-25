package net.weg.userapi.model.dto.response.classes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassResponseDTO {

    private Long id;
    private String name;
    private String area;
    private String course;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
