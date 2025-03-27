package api.chat.controllers;

import api.chat.entities.RoomConversation;
import api.chat.entities.User;
import api.chat.service.UserService;
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
@RequestMapping("/user")
@AllArgsConstructor
@Tag(name = "User", description = "User related operations")
/**
 * @author Vinícius Eduardo dos Santos
 */
public class UserController {

    private UserService service;

    @PostMapping()
    public ResponseEntity<User> create(@RequestBody User user){
        user = service.register(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<User> update(@RequestBody User user, Long id){
        user = service.changeById(id, user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        service.deletById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/findUserById/{id}")
    public ResponseEntity<User> readOne(@PathVariable Long id){
        User user = service.findbyId(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/findAllUsers")
    public ResponseEntity<List<User>> readAll(){
        List<User> userList = service.findAll();
        return new ResponseEntity<>(userList, HttpStatus.OK);
    }
}
