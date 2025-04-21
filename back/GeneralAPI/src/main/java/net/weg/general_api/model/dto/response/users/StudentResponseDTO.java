package net.weg.general_api.model.dto.response.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.dto.response.classes.ClassResponseDTO;
import net.weg.general_api.model.enums.RankENUM;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponseDTO {
    private Long id;
    private String name;
    private Boolean isRepresentant;
    private RankENUM lastRank;
    private Double lastFrequency;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private List<ClassResponseDTO> aClass;
    private UserAuthenticationResponseDTO userAuthentication;
}
