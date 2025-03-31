package com.example.logs_api.service;

import com.example.logs_api.model.entity.Log;
import com.example.logs_api.repository.LogRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class LogService {
    private LogRepository logRepository;

    public Log addLog(Log log) {
        return logRepository.save(log);
    }

    public Page<Log> getAllLogs(Pageable pageable) {
        return logRepository.findAll(pageable);
    }

    public Log getLogById(Long id) {
        Optional<Log> log = logRepository.findById(id);
        if (log.isPresent()) {
            return log.get();
        }
        throw new NoSuchElementException("Log with id:" + id + " not found");
    }
}
