package net.weg.userapi.model.dto.request.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentRequestDTO {
    @NotBlank(message = "{not.blank.message}")
    private String name;

    @NotBlank(message = "{not.blank.message}")
    @Email(message = "{email.message}")
    private String email;

    @NotBlank(message = "{not.blank.message}")
    private String password;

    @NotNull(message = "{not.null.message}")
    private Boolean isRepresentant;

    @NotNull
    private List<Long> classes_id;

}
