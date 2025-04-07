package net.weg.general_api.controller;

import lombok.AllArgsConstructor;
import net.weg.general_api.service.DashboardService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@AllArgsConstructor
public class DashboardController {

    private DashboardService service;

}
