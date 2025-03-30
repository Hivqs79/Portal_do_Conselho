package net.weg.general_api.controller.users;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.request.users.CustomizationRequestDTO;
import net.weg.general_api.model.dto.response.users.CustomizationResponseDTO;
import net.weg.general_api.service.users.CustomizationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customization")
@AllArgsConstructor
public class CustomizationController {

    private CustomizationService service;

    @PutMapping("/{user_id}")
    @Operation(method = "PUT", summary = "Update customization", description = "Updates user customization preferences")
    @ApiResponse(responseCode = "200", description = "Customization updated", content = @Content(schema = @Schema(implementation = CustomizationResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"modeTheme\":\"DARK\",\"pallete\":\"BLUE\",\"textFont\":\"ROBOTO\",\"titleFont\":\"MONTSERRAT\",\"fontSize\":\"MEDIUM\"}")))
    @ApiResponse(responseCode = "400", description = "Invalid customization data", content = @Content(examples = @ExampleObject(value = "{\"status\":400,\"error\":\"Validation Error\",\"message\":[\"modeTheme: must not be null\",\"pallete: must not be null\"]}")))
    @ApiResponse(responseCode = "404", description = "User not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<CustomizationResponseDTO> putCustomization(@RequestBody @Validated CustomizationRequestDTO customizationRequestDTO, @Parameter(description = "User ID", example = "1") @PathVariable Long user_id) {
        return new ResponseEntity<>(service.updateCustomization(customizationRequestDTO, user_id), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Get customization", description = "Returns user customization preferences")
    @ApiResponse(responseCode = "200", description = "Customization found", content = @Content(schema = @Schema(implementation = CustomizationResponseDTO.class), examples = @ExampleObject(value = "{\"id\":1,\"modeTheme\":\"LIGHT\",\"pallete\":\"GREEN\",\"textFont\":\"OPEN_SANS\",\"titleFont\":\"LATO\",\"fontSize\":\"SMALL\"}")))
    @ApiResponse(responseCode = "404", description = "Customization not found")
    @ApiResponse(responseCode = "500", description = "Server error")
    public ResponseEntity<CustomizationResponseDTO> getCustomization(@Parameter(description = "Customization ID", example = "1") @PathVariable Long id) {
        return new ResponseEntity<>(service.findCustomization(id), HttpStatus.OK);
    }
    
}
