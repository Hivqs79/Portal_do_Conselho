/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
