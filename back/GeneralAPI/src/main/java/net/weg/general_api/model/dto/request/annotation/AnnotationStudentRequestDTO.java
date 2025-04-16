package net.weg.general_api.model.dto.request.annotation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.entity.annotation.Annotation;
import net.weg.general_api.model.entity.annotation.AnnotationStudent;
import net.weg.general_api.model.enums.RankENUM;
import net.weg.general_api.service.council.CouncilService;
import net.weg.general_api.service.users.StudentService;
import net.weg.general_api.service.users.TeacherService;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnnotationStudentRequestDTO {
    private RankENUM rank;
    private Double last_frequency;
    private String strengths;
    private String toImprove;
    @NotNull(message = "{not.null.message}")
    private Long teacher_id;
    @NotNull(message = "{not.null.message}")
    private Long council_id;
    @NotNull(message = "{not.null.message}")
    private Long student_id;

    public AnnotationStudent converter(CouncilService councilService, TeacherService teacherService, StudentService studentService) {
        return new AnnotationStudent(
                this.rank,
                this.strengths,
                this.toImprove,
                councilService.findCouncilEntity(this.council_id),
                teacherService.findTeacherEntity(this.teacher_id),
                studentService.findStudentEntity(this.student_id));
    }

}
