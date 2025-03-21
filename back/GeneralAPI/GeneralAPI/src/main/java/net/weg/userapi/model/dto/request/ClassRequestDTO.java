package net.weg.userapi.model.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.enums.ClassAreaENUM;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassRequestDTO {

    @NotBlank(message = "{not.blank.message}")
    private String name;

    @NotNull(message = "{not.null.message}")
    private ClassAreaENUM area;

    @NotBlank(message = "{not.blank.message}")
    private String course;
}
