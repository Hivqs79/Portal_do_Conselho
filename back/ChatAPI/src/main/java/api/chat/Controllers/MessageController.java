package api.chat.Controllers;

import api.chat.Entities.Dto.MessageDto;
import api.chat.Entities.Message;
import api.chat.Service.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
@AllArgsConstructor
public class MessageController {

    private MessageService service;
    //sadasdasdasdsadasd

    @PostMapping("/postMessage")
    public ResponseEntity<Message> sendMessage(@RequestBody MessageDto dto){
        Message message = service.sendMessage(dto);
        return new ResponseEntity<>(message, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteMessage/{idMessage}")
    public void deleteMessage(@PathVariable Long idMessage){
        service.deleteMessage(idMessage);
    }

    @GetMapping("/findMessage/{idMessage}")
    public ResponseEntity<Message> findMessageById(@PathVariable Long idMessage){
        Message message = service.findMessageById(idMessage);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/findMessagesByIdRoom/{idRoom}")
    public ResponseEntity<List<Message>> findMessagesbyIdRoom(@PathVariable Long idRoom){
        List<Message> messages = service.findMessagesByIdRoom(idRoom);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

}

