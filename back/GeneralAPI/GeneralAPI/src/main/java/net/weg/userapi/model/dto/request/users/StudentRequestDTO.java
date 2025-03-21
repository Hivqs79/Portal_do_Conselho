package net.weg.userapi.model.dto.request.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

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

    private Double frequency;

    //Podem ser nulo

    private UUID imageKey;
    private List<Integer> classes_id;


}
