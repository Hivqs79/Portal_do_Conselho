package api.chat.controllers;

import api.chat.entities.dto.MessageDto;
import api.chat.entities.Message;
import api.chat.service.MessageService;
import com.fasterxml.jackson.core.JsonProcessingException;
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
@RequestMapping("/message")
@Tag(name = "Message", description = "Message related operations")
@AllArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 */
public class MessageController {

    private MessageService service;

    @PostMapping()
    @Operation(method = "POST", summary = "Send new message", description = "Returns sent message")
    @ApiResponse(responseCode = "201", description = "Message sent successfully",
            content = @Content(schema = @Schema(implementation = Message.class),
                    examples = @ExampleObject(value = "{\"id\":\"1\",\"content\":\"Olá, como vai?\",\"currentTimeDate\":\"2025-03-27T13:29:25.6294282\"," +
                            "\"sender\":{\"id\":\"2\",\"name\":\"Fulano\",\"email\":\"fulano@example.com\",\"password\":\"senha123\"}," +
                            "\"roomConversation\":{\"id\":\"1\",\"users\":[]}}")))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<Message> sendMessage(@RequestBody MessageDto dto) throws JsonProcessingException {
        Message message = service.sendMessage(dto);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Delete a message", description = "Delete a message by id")
    @ApiResponse(responseCode = "201", description = "Message deleted successfully",
            content = @Content(schema = @Schema(implementation = Message.class)))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public void deleteMessage(@PathVariable Long id) throws JsonProcessingException {
        service.deleteMessage(id);
    }

    @GetMapping("/{id}")
    @Operation(method = "GET", summary = "Find message", description = "Search message by id")
    @ApiResponse(responseCode = "201", description = "message found successfully",
            content = @Content(schema = @Schema(implementation = Message.class),
                    examples = @ExampleObject(value = "{\"id\":\"1\",\"content\":\"Olá, como vai?\",\"currentTimeDate\":\"2025-03-27T13:29:25.6294282\"," +
                            "\"sender\":{\"id\":\"2\",\"name\":\"Fulano\",\"email\":\"fulano@example.com\",\"password\":\"senha123\"}," +
                            "\"roomConversation\":{\"id\":\"1\",\"users\":[]}}")))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<Message> findMessageById(@PathVariable Long id){
        Message message = service.findMessageById(id);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/messages-room/{id}")
    @Operation(method = "GET", summary = "Find all messages by idRoom", description = "Search messages by idRoom")
    @ApiResponse(responseCode = "201", description = "messages found successfully",
            content = @Content(schema = @Schema(implementation = Message.class),
                    examples = @ExampleObject(value = "{\"messages\": [{\"id\": \"1\", \"content\": \"Olá, como vai?\", \"currentTimeDate\": \"2025-03-27T13:29:25.6294282\", " +
                            "\"sender\": {\"id\": \"2\", \"name\": \"Fulano\", \"email\": \"fulano@example.com\", \"password\": \"senha123\"}, " +
                            "\"roomConversation\": {\"id\": \"1\", \"users\": []} }, " +
                            "{\"id\": \"1\", \"content\": \"Bem, e você?\", \"currentTimeDate\": \"2025-03-27T13:34:11.6294897\", " +
                            "\"sender\": {\"id\": \"1\", \"name\": \"Ciclano\", \"email\": \"ciclano@example.com\", \"password\": \"senha321\"}, " +
                            "\"roomConversation\": {\"id\": \"1\", \"users\": []} }]}")))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<List<Message>> findMessagesByIdRoom(@PathVariable Long id){
        List<Message> messages = service.findMessagesByIdRoom(id);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
}

