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

package com.example.logs_api.controller;

import com.example.logs_api.model.entity.Log;
import com.example.logs_api.repository.LogRepository;
import com.example.logs_api.service.LogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Log Controller", description = "Controller para gerenciamento de registros de log")
public class LogController {
    private LogService logService;

    @GetMapping
    @Operation(method = "GET", summary = "Listar logs paginados", description = "Retorna uma lista paginada de todos os registros de log")
    @ApiResponse(responseCode = "200", description = "Logs recuperados com sucesso", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"action\":\"CREATE\",\"entity\":\"User\",\"entityId\":123,\"timestamp\":\"2023-01-01T10:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1}")))
    @Parameter(name = "page", description = "Número da página (0-based)", example = "0", in = ParameterIn.QUERY)
    @Parameter(name = "size", description = "Quantidade de itens por página", example = "10", in = ParameterIn.QUERY)
    @Parameter(name = "sort", description = "Critérios de ordenação (formato: propriedade,asc|desc)", example = "timestamp,desc", in = ParameterIn.QUERY)
    public ResponseEntity<Page<Log>> getAllLogs(Pageable pageable) {
        Page<Log> logsPage = logService.getAllLogs(pageable);
        return new ResponseEntity<>(logsPage, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Obter log por ID", description = "Retorna um registro de log específico pelo seu ID")
    @ApiResponse(responseCode = "200", description = "Log encontrado", content = @Content(schema = @Schema(implementation = Log.class), examples = @ExampleObject(value = "{\"id\":1,\"action\":\"CREATE\",\"entity\":\"User\",\"entityId\":123,\"timestamp\":\"2023-01-01T10:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Log não encontrado", content = @Content(examples = @ExampleObject(value = "{\"status\":404,\"message\":\"Log with id: 1 not found\"}")))
    @Parameter(name = "id", description = "ID do log", example = "1", required = true, in = ParameterIn.PATH)
    public ResponseEntity<Log> getLogById(@PathVariable Long id) {
        Log log = logService.getLogById(id);
        return new ResponseEntity<>(log, HttpStatus.OK);
    }
}