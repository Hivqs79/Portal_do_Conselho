package net.weg.userapi.model.dto.request.users;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.enums.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomizationRequestDTO {
    @NotNull(message = "{not.null.message}")
    private ModeThemeENUM modeTheme;

    @NotNull(message = "{not.null.message}")
    private PalleteENUM pallete;

    @NotNull(message = "{not.null.message}")
    private TextFont textFont;

    @NotNull(message = "{not.null.message}")
    private TitleFont titleFont;

    @NotNull(message = "{not.null.message}")
    private FontSizeENUM fontSize;

}
