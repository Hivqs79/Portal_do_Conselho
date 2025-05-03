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

package net.weg.general_api.controller.preCouncil;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import net.kaczmarzyk.spring.data.jpa.domain.Equal;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import net.weg.general_api.model.dto.request.preCouncil.PreCouncilRequestDTO;
import net.weg.general_api.model.dto.response.preCouncil.PreCouncilResponseDTO;
import net.weg.general_api.model.entity.preCouncil.PreCouncil;
import net.weg.general_api.service.preCouncil.PreCouncilService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pre-council")
@AllArgsConstructor
@Tag(name = "Pre Council Controller", description = "Controller para gerenciamento de registros dos pré conselhos")
public class PreCouncilController {

    private PreCouncilService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search pre-councils", description = "Returns paginated pre-councils with filters")
    @ApiResponse(responseCode = "200", description = "Pre-councils found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<PreCouncilResponseDTO> searchPreCouncil(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "aClass.name", params = "className", spec = Like.class), @Spec(path = "answered", params = "answered", spec = Equal.class), @Spec(path = "isReturned", params = "returned", spec = Equal.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<PreCouncil> spec, Pageable pageable) {
        return service.findPreCouncilSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create pre-council", description = "Creates new pre-council")
    @ApiResponse(responseCode = "200", description = "Pre-council created", content = @Content(schema = @Schema(implementation = PreCouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"council_id: must not be null\"]}")))
    @ApiResponse(responseCode = "404", description = "Council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilResponseDTO> postPreCouncil(@RequestBody @Validated PreCouncilRequestDTO preCouncilRequestDTO) {
        return new ResponseEntity<>(service.createPreCouncil(preCouncilRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update pre-council", description = "Updates existing pre-council")
    @ApiResponse(responseCode = "200", description = "Pre-council updated", content = @Content(schema = @Schema(implementation = PreCouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Pre-council or council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilResponseDTO> putPreCouncil(@RequestBody @Validated PreCouncilRequestDTO preCouncilRequestDTO, @Parameter(description = "Pre-council ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updatePreCouncil(preCouncilRequestDTO, id), HttpStatus.OK);
    }

    @PatchMapping("/finalize/{id}")
    @Operation(method = "PATCH", summary = "Finalize pre-council", description = "Finalizes a pre-council by it's id")
    @ApiResponse(responseCode = "200", description = "Pre-council finalized", content = @Content(schema = @Schema(implementation = PreCouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Pre-council or council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilResponseDTO> finalizePreCouncil(@Parameter(description = "Pre-council ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.finalizePreCouncil(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable pre-council", description = "Disables pre-council")
    @ApiResponse(responseCode = "200", description = "Pre-council disabled", content = @Content(schema = @Schema(implementation = PreCouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Pre-council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilResponseDTO> disablePreCouncil(@Parameter(description = "Pre-council ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disablePreCouncil(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get pre-council", description = "Returns pre-council by ID")
    @ApiResponse(responseCode = "200", description = "Pre-council found", content = @Content(schema = @Schema(implementation = PreCouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Pre-council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilResponseDTO> getPreCouncil(@Parameter(description = "Pre-council ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findPreCouncil(id), HttpStatus.OK);
    }

    @GetMapping("/leader/{idLeader}")
    @Operation(method = "GET", summary = "Get pre-council", description = "Returns pre-council by ID of class leader")
    @ApiResponse(responseCode = "200", description = "Pre-council found", content = @Content(schema = @Schema(implementation = PreCouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Pre-council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilResponseDTO> getPreCouncilByLeaderId(@Parameter(description = "Class leader ID", example = "1") @PathVariable Long idLeader) {
        return new ResponseEntity<>(service.getPreCouncilByLeaderId(idLeader), HttpStatus.OK);
    }

    @PatchMapping("/return/{id}")
    @Operation(method = "PATCH", summary = "Return pre-council", description = "Returns pre-council")
    @ApiResponse(responseCode = "200", description = "Pre-council returned", content = @Content(schema = @Schema(implementation = PreCouncilResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\",\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Pre-council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<Void> returnPreCouncil(@Parameter(description = "Pre council ID", example = "1") @PathVariable Long id) {
        service.returnPreCouncil(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}