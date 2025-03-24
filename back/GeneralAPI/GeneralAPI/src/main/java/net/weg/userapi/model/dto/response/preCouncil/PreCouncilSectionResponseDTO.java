package net.weg.userapi.model.dto.response.preCouncil;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreCouncilSectionResponseDTO {

    private Integer id;
    private PreCouncilResponseDTO preCouncil;
    private String topic;
    private String description;
    private String strengths;
    private String toImprove;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
