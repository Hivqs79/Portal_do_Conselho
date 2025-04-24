package net.weg.general_api.model.dto.response;

import net.weg.general_api.model.dto.response.users.StudentResponseDTO;

import java.util.List;

public record SatisfiedFeedbackDashboardResponseDTO(
        Integer satisfiedFeedback,
        Integer nonsatisfiedFeedback,
        Double satisfiedFeedbackPercent,
        Double nonsatisfiedFeedbackPercent,
        List<StudentResponseDTO> studentListViewed,
        List<StudentResponseDTO> nonStudentListViewed

) {
}
