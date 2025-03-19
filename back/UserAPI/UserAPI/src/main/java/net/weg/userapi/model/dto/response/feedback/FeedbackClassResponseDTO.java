package net.weg.userapi.model.dto.response.feedback;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.ClassResponseDTO;
import net.weg.userapi.model.dto.response.council.CouncilResponseDTO;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackClassResponseDTO {
    private Integer id;
    private String rank;
    private CouncilResponseDTO council;
    private String strengths;
    private String toImprove;
    private ClassResponseDTO aClass;
}
