package net.weg.userapi.model.dto.request;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @NotBlank
    private String name;

    private ClassAreaENUM area;

    @NotBlank
    private String course;
}
