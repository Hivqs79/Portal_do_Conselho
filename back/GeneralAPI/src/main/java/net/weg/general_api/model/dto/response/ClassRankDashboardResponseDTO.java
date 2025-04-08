package net.weg.general_api.model.dto.response;

public record ClassRankDashboardResponseDTO(String className, int excellentStudents, int goodStudents, int averageStudents, int criticalStudents, int noneStudents, Object classRankAtual) {
}
