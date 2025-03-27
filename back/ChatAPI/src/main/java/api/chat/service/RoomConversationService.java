package api.chat.service;

import api.chat.entities.dto.RoomConversationDto;
import api.chat.entities.RoomConversation;
import api.chat.repositorys.RoomConversationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 */
public class RoomConversationService {

    private MessageService messageService;
    private RoomConversationRepository repositoryRoom;
    private UserService userService;

    public RoomConversation register(RoomConversationDto dto){
        RoomConversation room = dto.conversorRoom(userService, messageService);
        return repositoryRoom.save(room);
    }

    public List<RoomConversation> findAll(){
        return repositoryRoom.findAll();
    }

    public RoomConversation findbyId(Long id){
        Optional<RoomConversation> optional = repositoryRoom.findById(id);
        return optional.get();
    }

    public void deleteById(Long id){
        repositoryRoom.deleteById(id);
    }
}
