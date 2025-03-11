package net.weg.userapi.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponseDTO {
    private Integer id;
    private String name;
    private String email;
    private String password;
    private Boolean isRepresentant;
}
