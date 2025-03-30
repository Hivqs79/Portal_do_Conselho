package net.weg.general_api.model.dto.response.feedback;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.dto.response.council.CouncilResponseDTO;
import net.weg.general_api.model.dto.response.users.StudentResponseDTO;
import net.weg.general_api.model.enums.RankENUM;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackStudentResponseDTO {
    private Long id;
    private RankENUM rank;
    private CouncilResponseDTO council;
    private String strengths;
    private String toImprove;
    private StudentResponseDTO student;
    private double frequency;
    private boolean isViewed;
    private boolean isSatisfied;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

}
