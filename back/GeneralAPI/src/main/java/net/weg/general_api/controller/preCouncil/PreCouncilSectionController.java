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
import net.weg.general_api.model.dto.request.preCouncil.PreCouncilSectionRequestDTO;
import net.weg.general_api.model.dto.response.preCouncil.PreCouncilSectionResponseDTO;
import net.weg.general_api.model.entity.preCouncil.PreCouncilSection;
import net.weg.general_api.service.preCouncil.PreCouncilSectionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pre-council/section")
@AllArgsConstructor
@Tag(name = "Pre Council Section Controller", description = "Controller para gerenciamento de registros das seções pré conselhos")
public class PreCouncilSectionController {

    private PreCouncilSectionService service;

    @GetMapping
    @Operation(method = "GET", summary = "Search pre-council sections", description = "Returns paginated pre-council sections with filters")
    @ApiResponse(responseCode = "200", description = "Sections found", content = @Content(schema = @Schema(implementation = Page.class), examples = @ExampleObject(value = "{\"content\":[{\"id\":1,\"topic\":\"Student Performance\",\"description\":\"Analysis of student progress\",\"strengths\":\"Good overall performance\",\"toImprove\":\"Need more participation\",\"preCouncil\":{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\"},\"createDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}],\"pageable\":{\"pageNumber\":0,\"pageSize\":10,\"sort\":{\"sorted\":false,\"unsorted\":true,\"empty\":true}},\"totalElements\":1,\"totalPages\":1}")))
    @ApiResponse(responseCode = "400", description = "Invalid parameters")
    @ApiResponse(responseCode = "500", description = "Server error")
    public Page<PreCouncilSectionResponseDTO> searchPreCouncilSection(@And({@Spec(path = "id", spec = Equal.class), @Spec(path = "topic", spec = Like.class), @Spec(path = "description", spec = Like.class), @Spec(path = "strengths", spec = Like.class), @Spec(path = "toImprove", spec = Like.class), @Spec(path = "createDate", params = "createdAfter", spec = GreaterThanOrEqual.class), @Spec(path = "createDate", params = "createdBefore", spec = LessThanOrEqual.class), @Spec(path = "updateDate", params = "updatedAfter", spec = GreaterThanOrEqual.class), @Spec(path = "updateDate", params = "updatedBefore", spec = LessThanOrEqual.class)}) Specification<PreCouncilSection> spec, Pageable pageable) {
        return service.findPreCouncilSectionSpec(spec, pageable);
    }

    @PostMapping
    @Operation(method = "POST", summary = "Create pre-council section", description = "Creates new pre-council section")
    @ApiResponse(responseCode = "200", description = "Section created", content = @Content(schema = @Schema(implementation = PreCouncilSectionResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"topic\":\"New Topic\",\"description\":\"Detailed analysis\",\"strengths\":\"Team collaboration\",\"toImprove\":\"Time management\",\"preCouncil\":{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\"},\"createDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"preCouncil_id: must not be null\",\"topic: must not be blank\",\"description: must not be blank\",\"strengths: must not be blank\",\"toImprove: must not be blank\"]}")))
    @ApiResponse(responseCode = "404", description = "Pre-council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilSectionResponseDTO> postPreCouncilSection(@RequestBody @Validated PreCouncilSectionRequestDTO preCouncilRequestDTO) {
        return new ResponseEntity<>(service.createPreCouncilSection(preCouncilRequestDTO), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(method = "PUT", summary = "Update pre-council section", description = "Updates existing pre-council section")
    @ApiResponse(responseCode = "200", description = "Section updated", content = @Content(schema = @Schema(implementation = PreCouncilSectionResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"topic\":\"Updated Topic\",\"description\":\"Revised analysis\",\"strengths\":\"Improved performance\",\"toImprove\":\"Better communication\",\"preCouncil\":{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\"},\"createDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-02T00:00:00\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid data")
    @ApiResponse(responseCode = "404", description = "Section or pre-council not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilSectionResponseDTO> putPreCouncilSection(@RequestBody @Validated PreCouncilSectionRequestDTO preCouncilRequestDTO, @Parameter(description = "Section ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.updatePreCouncilSection(preCouncilRequestDTO, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable pre-council section", description = "Disables pre-council section")
    @ApiResponse(responseCode = "200", description = "Section disabled", content = @Content(schema = @Schema(implementation = PreCouncilSectionResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"topic\":\"Final Evaluation\",\"description\":\"Closing remarks\",\"strengths\":\"Excellent progress\",\"toImprove\":\"None\",\"preCouncil\":{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\"},\"createDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-03T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Section not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilSectionResponseDTO> disablePreCouncilSection(@Parameter(description = "Section ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.disablePreCouncilSection(id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get pre-council section", description = "Returns pre-council section by ID")
    @ApiResponse(responseCode = "200", description = "Section found", content = @Content(schema = @Schema(implementation = PreCouncilSectionResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"topic\":\"Student Performance\",\"description\":\"Detailed analysis\",\"strengths\":\"Good results\",\"toImprove\":\"More practice needed\",\"preCouncil\":{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\"},\"createDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Section not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<PreCouncilSectionResponseDTO> getPreCouncilSection(@Parameter(description = "Section ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findPreCouncilSection(id), HttpStatus.OK);
    }

    @GetMapping("/pre-council/{idPreCouncil}")
    @Operation(method = "GET", summary = "Get all pre-councils section", description = "Returns pre-council sections by pre-council ID")
    @ApiResponse(responseCode = "200", description = "Sections found", content = @Content(schema = @Schema(implementation = PreCouncilSectionResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"topic\":\"Student Performance\",\"description\":\"Detailed analysis\",\"strengths\":\"Good results\",\"toImprove\":\"More practice needed\",\"preCouncil\":{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\"},\"createDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Sections not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<List<PreCouncilSectionResponseDTO>> getAllByPreCouncilId(@Parameter(description = "Pre-council ID", example = "1") @PathVariable Long idPreCouncil) {
        return new ResponseEntity<>(service.getAllByPreCouncilId(idPreCouncil), HttpStatus.OK);
    }

    @GetMapping("/leader/{idLeader}")
    @Operation(method = "GET", summary = "Get all pre-councils section", description = "Returns pre-council sections by leader ID of pre-council class")
    @ApiResponse(responseCode = "200", description = "Sections found", content = @Content(schema = @Schema(implementation = PreCouncilSectionResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"topic\":\"Student Performance\",\"description\":\"Detailed analysis\",\"strengths\":\"Good results\",\"toImprove\":\"More practice needed\",\"preCouncil\":{\"id\":1,\"council\":{\"id\":1,\"startDateTime\":\"2025-01-01T10:00:00\"},\"createDate\":\"2025-01-01T00:00:00\"},\"createDate\":\"2025-01-01T00:00:00\",\"updateDate\":\"2025-01-01T00:00:00\"}")))
    @ApiResponse(responseCode = "404", description = "Sections not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<List<PreCouncilSectionResponseDTO>> getAllByLeaderId(@Parameter(description = "Leader ID of pre-council class", example = "1") @PathVariable Long idLeader) {
        return new ResponseEntity<>(service.getAllByLeaderId(idLeader), HttpStatus.OK);
    }
}