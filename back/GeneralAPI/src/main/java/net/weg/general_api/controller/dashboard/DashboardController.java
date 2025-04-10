package net.weg.general_api.controller.dashboard;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.response.ClassRankDashboardResponseDTO;
import net.weg.general_api.model.dto.response.FrequencyAvarageDashboardResponseDTO;
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
public class DashboardController {

    private DashboardService service;

    @GetMapping("/average-frequency/{className}")
    public ResponseEntity<FrequencyAvarageDashboardResponseDTO> getFrequencyAverage(@PathVariable String className) {
        return new ResponseEntity<>(service.getFrequencyAvarageDashboard(className), HttpStatus.OK);
    }

    @GetMapping("/class-ranks/{className}/{year}")
    public ResponseEntity<ClassRankDashboardResponseDTO> getClassRanks(
            @PathVariable String className, @PathVariable int year) {
        return new ResponseEntity<>(service.getClassRankDashboard(className, year), HttpStatus.OK);
    }


}
