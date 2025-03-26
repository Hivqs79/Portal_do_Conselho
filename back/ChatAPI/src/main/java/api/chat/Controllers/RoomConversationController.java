package api.chat.Controllers;

import api.chat.Entities.Dto.RoomConversationDto;
import api.chat.Entities.Message;
import api.chat.Entities.RoomConversation;
import api.chat.Service.MessageService;
import api.chat.Service.RoomConversationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/room")
@AllArgsConstructor
public class RoomConversationController {

    private RoomConversationService roomService;

    @PostMapping
    public ResponseEntity<RoomConversation> create(@RequestBody RoomConversationDto dto){
        RoomConversation room = roomService.register(dto);

        return new ResponseEntity<>(room, HttpStatus.CREATED);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        roomService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomConversation> readOne(@PathVariable Long id){
        RoomConversation room = roomService.findbyId(id);
        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<RoomConversation>> readAll(){
        List<RoomConversation> roomList = roomService.findAll();
        return new ResponseEntity<>(roomList, HttpStatus.OK);
    }
}
