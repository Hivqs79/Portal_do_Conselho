package net.weg.userapi.model.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PedagogicRequestDTO {

    @NotBlank
    private String name;

    @NotNull
    @Email
    private String email;

    @NotNull
    private String password;
}
