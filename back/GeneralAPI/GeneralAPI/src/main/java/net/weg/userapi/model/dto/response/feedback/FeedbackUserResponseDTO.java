package net.weg.userapi.model.dto.response.feedback;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.council.CouncilResponseDTO;
import net.weg.userapi.model.dto.response.users.UserResponseDTO;
import net.weg.userapi.model.entity.users.User;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackUserResponseDTO {
    private Integer id;
    private String rank;
    private CouncilResponseDTO council;
    private String strengths;
    private String toImprove;
    private UserResponseDTO user;

}
