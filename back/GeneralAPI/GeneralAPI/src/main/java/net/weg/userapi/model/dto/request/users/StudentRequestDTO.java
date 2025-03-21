package net.weg.userapi.model.dto.request.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.entity.Class;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentRequestDTO {
    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotNull
    private Boolean isRepresentant;

    private Double frequency;

    //Podem ser nulo

    private UUID imageKey;
    private List<Integer> classes_id;


}
