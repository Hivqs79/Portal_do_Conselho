package net.weg.userapi.model.dto.response.annotation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.dto.response.council.CouncilResponseDTO;
import net.weg.userapi.model.dto.response.users.StudentResponseDTO;
import net.weg.userapi.model.dto.response.users.TeacherResponseDTO;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnotationStudentResponseDTO {
    private Long id;
    private String rank;
    private String strengths;
    private String toImprove;
    private TeacherResponseDTO teacher;
    private StudentResponseDTO student;
    private CouncilResponseDTO council;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;

}
