package net.weg.userapi.model.dto.response.classes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.enums.RankENUM;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassResponseDTO {

    private Long id;
    private String name;
    private String area;
    private String course;
    private RankENUM lastRank;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
}
