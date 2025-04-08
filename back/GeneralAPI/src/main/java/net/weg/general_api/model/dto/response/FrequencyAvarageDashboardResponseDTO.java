package net.weg.general_api.model.dto.response;

import java.util.Map;

public record FrequencyAvarageDashboardResponseDTO(String className, double averageFrequency, Map<String, Double> map) {

}
