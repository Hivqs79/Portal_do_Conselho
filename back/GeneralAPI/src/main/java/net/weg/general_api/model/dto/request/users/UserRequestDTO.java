package net.weg.general_api.model.dto.request.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDTO {

    @NotBlank(message = "{not.blank.message}")
    private String name;

    @NotBlank(message = "{not.blank.message}")
    @Email(message = "{email.message}")
    private String email;

    @NotBlank(message = "{not.blank.message}")
    private String password;
}
