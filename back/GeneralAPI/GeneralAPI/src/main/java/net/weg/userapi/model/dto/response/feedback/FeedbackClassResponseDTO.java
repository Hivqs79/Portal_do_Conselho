package net.weg.userapi.model.dto.response.feedback;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.council.CouncilResponseDTO;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackClassResponseDTO {
    private Integer id;
    private String rank;
    private CouncilResponseDTO council;
    private String strengths;
    private String toImprove;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
