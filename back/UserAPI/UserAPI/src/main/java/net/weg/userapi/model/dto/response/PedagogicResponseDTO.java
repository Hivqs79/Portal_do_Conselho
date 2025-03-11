package net.weg.userapi.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PedagogicResponseDTO {

    private Integer id;
    private String name;
    private String email;
    private String password;
}
