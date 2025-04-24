package net.weg.general_api.controller.dashboard;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.response.ClassRankDashboardResponseDTO;
import net.weg.general_api.model.dto.response.FrequencyAvarageDashboardResponseDTO;
import net.weg.general_api.model.dto.response.SatisfiedFeedbackDashboardResponseDTO;
import net.weg.general_api.model.dto.response.VisualizedFeedbackDashboardResponseDTO;
import net.weg.general_api.service.dashboard.DashboardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@AllArgsConstructor
@Tag(name = "Dashboard Controller", description = "Controller para gerenciamento de registros das dashboards")
public class DashboardController {

    private DashboardService service;

    @GetMapping("/average-frequency/{className}")
    @Operation(method = "GET", summary = "Get frequency average", description = "Returns the frequency average metrics for a specific class")
    @ApiResponse(responseCode = "200", description = "Frequency average retrieved successfully",
            content = @Content(schema = @Schema(implementation = FrequencyAvarageDashboardResponseDTO.class)))
    @ApiResponse(responseCode = "404", description = "Class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<FrequencyAvarageDashboardResponseDTO> getFrequencyAverage(@PathVariable String className) {
        return new ResponseEntity<>(service.getFrequencyAvarageDashboard(className), HttpStatus.OK);
    }

    @GetMapping("/class-ranks/{className}")
    @Operation(method = "GET", summary = "Get class ranks", description = "Returns the rank evolution metrics for a specific class")
    @ApiResponse(responseCode = "200", description = "Class ranks retrieved successfully",
            content = @Content(schema = @Schema(implementation = ClassRankDashboardResponseDTO.class)))
    @ApiResponse(responseCode = "404", description = "Class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<ClassRankDashboardResponseDTO> getClassRanks(
            @PathVariable String className) {
        return new ResponseEntity<>(service.getClassRankDashboard(className), HttpStatus.OK);
    }

    @GetMapping("/visualized-feedbacks/{className}")
    @Operation(method = "GET", summary = "Get visualized feedbacks", description = "Returns metrics about visualized feedbacks for a specific class")
    @ApiResponse(responseCode = "200", description = "Visualized feedbacks retrieved successfully",
            content = @Content(schema = @Schema(implementation = VisualizedFeedbackDashboardResponseDTO.class)))
    @ApiResponse(responseCode = "404", description = "Class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<VisualizedFeedbackDashboardResponseDTO> getVisualizedFeedback(
            @PathVariable String className) {
        return new ResponseEntity<>(service.getVisualizedFeedbackDashboard(className), HttpStatus.OK);
    }

    @GetMapping("/satisfied-feedbacks/{className}")
    @Operation(method = "GET", summary = "Get satisfied feedbacks", description = "Returns metrics about satisfied feedbacks for a specific class")
    @ApiResponse(responseCode = "200", description = "Satisfied feedbacks retrieved successfully",
            content = @Content(schema = @Schema(implementation = SatisfiedFeedbackDashboardResponseDTO.class)))
    @ApiResponse(responseCode = "404", description = "Class not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<SatisfiedFeedbackDashboardResponseDTO> getSatisfiedFeedback(
            @PathVariable String className) {
        return new ResponseEntity<>(service.getSatisfiedFeedbackDashboard(className), HttpStatus.OK);
    }


}
