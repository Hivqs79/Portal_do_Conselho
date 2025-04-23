package net.weg.general_api.model.dto.response;

import net.weg.general_api.model.dto.response.users.StudentResponseDTO;
import net.weg.general_api.model.entity.users.Student;

import java.util.List;

public record VisualizedFeedbackDashboardResponseDTO(
        Integer visualizedFeedback,
        Integer nonVisualizedFeedback,
        Double visualizedFeedbackPercent,
        Double nonVisualizedFeedbackPercent,
        List<StudentResponseDTO> studentListViewed,
        List<StudentResponseDTO> nonStudentListViewed

) {
}
