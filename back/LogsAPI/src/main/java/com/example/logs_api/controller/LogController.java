package com.example.logs_api.controller;

import com.example.logs_api.model.entity.Log;
import com.example.logs_api.repository.LogRepository;
import com.example.logs_api.service.LogService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/log")
public class LogController {
    private LogService logService;

    @PostMapping
    public ResponseEntity<Log> addLog(@RequestBody Log log) {
        log = logService.addLog(log);
        return new ResponseEntity<>(log, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<Log>> getAllLogs(Pageable pageable) {
        Page<Log> logsPage = logService.getAllLogs(pageable);
        return new ResponseEntity<>(logsPage, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Log> getLogById(@PathVariable Long id) {
        Log log = logService.getLogById(id);
        return new ResponseEntity<>(log, HttpStatus.OK);
    }
}
