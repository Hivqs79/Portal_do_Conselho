package net.weg.general_api.model.dto.response.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.enums.RankENUM;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponseDTO {
    private Long id;
    private String name;
    private Boolean isRepresentant;
    private RankENUM lastRank;
    private double lastFrequency;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private UserAuthenticationResponseDTO userAuthentication;
}
