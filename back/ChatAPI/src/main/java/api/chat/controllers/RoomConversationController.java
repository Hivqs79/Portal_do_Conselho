package api.chat.controllers;

import api.chat.entities.Message;
import api.chat.entities.dto.RoomConversationDto;
import api.chat.entities.RoomConversation;
import api.chat.service.RoomConversationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/room")
@Tag(name = "Room Conversation", description = "Room Conversation related operations")
@AllArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 */
public class RoomConversationController {

    private RoomConversationService roomService;

    @PostMapping()
    @Operation(method = "POST", summary = "Create a new conversation", description = "Returns the create new room conversation")
    @ApiResponse(responseCode = "201", description = "Room conversation create successfully",
            content = @Content(schema = @Schema(implementation = RoomConversation.class),
                    examples = @ExampleObject(value = "{\"id\":\"1\",\"users\":[{\"id\":\"2\",\"name\":\"Fulano\",\"email\":\"fulano@example.com\",\"password\":\"senha123\"}," +
                            "{\"id\":\"1\",\"name\":\"Ciclano\",\"email\":\"ciclano@example.com\",\"password\":\"senha321\"}]}")))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<RoomConversation> create(@RequestBody @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Dados da mensagem a ser enviada",
            required = true,
            content = @Content(mediaType = "application/json",
                    examples = @ExampleObject(value = "{\n" +
                            "    \"user1\": 1 ,\n" +
                            "    \"user2\": 2\n" +
                            "}"))
    ) RoomConversationDto dto){
        RoomConversation room = roomService.register(dto);

        return new ResponseEntity<>(room, HttpStatus.CREATED);
    }


    @DeleteMapping("/deleteRoom/{id}")
    @Operation(method = "DELETE", summary = "Delete a room conversation", description = "Delete a room conversation by id")
    @ApiResponse(responseCode = "201", description = "Room conversation delete successfully",
            content = @Content(schema = @Schema(implementation = RoomConversation.class)))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        roomService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/findByRoomConversation/{id}")
    @Operation(method = "GET", summary = "Find a room conversation", description = "Search a room conversation by id")
    @ApiResponse(responseCode = "201", description = "Room conversation found successfully",
            content = @Content(schema = @Schema(implementation = RoomConversation.class),
                    examples = @ExampleObject(value = "{\"id\":\"1\",\"users\":[{\"id\":\"2\",\"name\":\"Fulano\",\"email\":\"fulano@example.com\",\"password\":\"senha123\"}," +
                            "{\"id\":\"1\",\"name\":\"Ciclano\",\"email\":\"ciclano@example.com\",\"password\":\"senha321\"}]}")))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<RoomConversation> readOne(@PathVariable Long id){
        RoomConversation room = roomService.findbyId(id);
        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    @GetMapping("/findAllRooms")
    @Operation(method = "GET", summary = "Find a room conversation", description = "Search a room conversation by id")
    @ApiResponse(responseCode = "201", description = "Room conversation found successfully",
            content = @Content(schema = @Schema(implementation = RoomConversation.class),
                    examples = @ExampleObject(value = "{\"id\":\"1\",\"users\":[{\"id\":\"2\",\"name\":\"Fulano\",\"email\":\"fulano@example.com\",\"password\":\"senha123\"}," +
                            "{\"id\":\"1\",\"name\":\"Ciclano\",\"email\":\"ciclano@example.com\",\"password\":\"senha321\"}]}")))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<List<RoomConversation>> readAll(){
        List<RoomConversation> roomList = roomService.findAll();
        return new ResponseEntity<>(roomList, HttpStatus.OK);
    }
}
