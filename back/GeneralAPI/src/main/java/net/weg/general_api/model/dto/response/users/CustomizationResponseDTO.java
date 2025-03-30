package net.weg.general_api.model.dto.response.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.enums.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomizationResponseDTO {
    private Long id;

    private ModeThemeENUM modeTheme;

    private PalleteENUM pallete;

    private TextFont textFont;

    private TitleFont titleFont;

    private FontSizeENUM fontSize;

}
