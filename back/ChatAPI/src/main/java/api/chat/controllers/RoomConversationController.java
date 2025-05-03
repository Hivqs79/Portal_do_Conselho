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

package api.chat.controllers;

import api.chat.entities.dto.RoomConversationDto;
import api.chat.entities.RoomConversation;
import api.chat.service.RoomConversationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
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
import java.util.Optional;


@RestController
@RequestMapping("/room")
@Tag(name = "Room Conversation", description = "Room Conversation related operations")
@AllArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 * @author Pedro Henrique Panstein
 */ public class RoomConversationController {

    private RoomConversationService roomService;

    @PostMapping()
    @Operation(method = "POST", summary = "Create a new conversation", description = "Returns the create new room conversation")
    @ApiResponse(responseCode = "201", description = "Room conversation create successfully", content = @Content(schema = @Schema(implementation = RoomConversation.class), examples = @ExampleObject(value = "{\"id\":\"1\",\"users\":[{\"id\":\"2\",\"name\":\"Fulano\",\"email\":\"fulano@example.com\",\"password\":\"senha123\"}," + "{\"id\":\"1\",\"name\":\"Ciclano\",\"email\":\"ciclano@example.com\",\"password\":\"senha321\"}]}")))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<RoomConversation> create(@RequestBody @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Dados da mensagem a ser enviada", required = true, content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\n" + "    \"user1\": 1 ,\n" + "    \"user2\": 2\n" + "}"))) RoomConversationDto dto) throws JsonProcessingException {
        RoomConversation room = roomService.register(dto);

        return new ResponseEntity<>(room, HttpStatus.CREATED);
    }


    @DeleteMapping("/deleteRoom/{id}")
    @Operation(method = "DELETE", summary = "Delete a room conversation", description = "Delete a room conversation by id")
    @ApiResponse(responseCode = "201", description = "Room conversation delete successfully", content = @Content(schema = @Schema(implementation = RoomConversation.class)))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        roomService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/findByRoomConversation/{id}")
    @Operation(method = "GET", summary = "Find a room conversation", description = "Search a room conversation by id")
    @ApiResponse(responseCode = "201", description = "Room conversation found successfully", content = @Content(schema = @Schema(implementation = RoomConversation.class), examples = @ExampleObject(value = "{\"id\":\"1\",\"users\":[{\"id\":\"2\",\"name\":\"Fulano\",\"email\":\"fulano@example.com\",\"password\":\"senha123\"}," + "{\"id\":\"1\",\"name\":\"Ciclano\",\"email\":\"ciclano@example.com\",\"password\":\"senha321\"}]}")))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<RoomConversation> readOne(@PathVariable Long id) {
        RoomConversation room = roomService.findById(id);
        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    @GetMapping("/findAllRooms")
    @Operation(method = "GET", summary = "Find a room conversation", description = "Search a room conversation by id")
    @ApiResponse(responseCode = "201", description = "Room conversation found successfully", content = @Content(schema = @Schema(implementation = RoomConversation.class), examples = @ExampleObject(value = "{\"id\":\"1\",\"users\":[{\"id\":\"2\",\"name\":\"Fulano\",\"email\":\"fulano@example.com\",\"password\":\"senha123\"}," + "{\"id\":\"1\",\"name\":\"Ciclano\",\"email\":\"ciclano@example.com\",\"password\":\"senha321\"}]}")))
    @ApiResponse(responseCode = "400", description = "Invalid request")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<List<RoomConversation>> readAll() {
        List<RoomConversation> roomList = roomService.findAll();
        return new ResponseEntity<>(roomList, HttpStatus.OK);
    }

    @GetMapping("/findAllRoomsOfAUser/{userId}")
    @Operation(method = "GET", summary = "Find all rooms of a user", description = "Search all rooms conversations that contain the specified user id")
    @ApiResponse(responseCode = "200", description = "Rooms conversations found successfully", content = @Content(array = @ArraySchema(schema = @Schema(implementation = RoomConversation.class)), examples = @ExampleObject(value = "[{\"id\":1,\"usersId\":[1,2]}, {\"id\":2,\"usersId\":[1,3]}]")))
    @ApiResponse(responseCode = "400", description = "Invalid user id")
    @ApiResponse(responseCode = "404", description = "No rooms found for this user")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    public ResponseEntity<List<RoomConversation>> findAllRoomsOfAUser(@PathVariable Long userId) {
        List<RoomConversation> rooms = roomService.findAllRoomsOfAUser(userId);
        if (rooms.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @PostMapping("/findRoomByTwoUsers")
    @Operation(method = "POST", summary = "Find room by exactly two users", description = "Finds a room conversation that contains exactly the two specified users, regardless of order")
    @ApiResponse(responseCode = "200", description = "Room found successfully or message returned if not found", content = {@Content(schema = @Schema(implementation = RoomConversation.class)), @Content(schema = @Schema(type = "string"))})
    @ApiResponse(responseCode = "400", description = "Invalid request - must provide exactly two user IDs")
    @ApiResponse(responseCode = "404", description = "Room not found")
    public ResponseEntity<Object> findRoomByTwoUsers(@RequestBody @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Room search criteria", required = true, content = @Content(mediaType = "application/json", schema = @Schema(implementation = RoomConversationDto.class), examples = @ExampleObject(value = "{\"usersId\": [1, 2]}"))) RoomConversationDto room) {

        if (room.getUsersId() == null || room.getUsersId().size() != 2) {
            return new ResponseEntity<>("Request inválido! Envie exatamente dois IDs de usuários.", HttpStatus.BAD_REQUEST);
        }

        Optional<RoomConversation> result = roomService.findRoomByTwoUsers(room.getUsersId());

        if (result.isPresent()) {
            return ResponseEntity.ok(result.get());
        } else {
            return new ResponseEntity<>("Não foi encontrada nenhuma sala", HttpStatus.OK);
        }
    }
}
