package api.chat.Service;

import api.chat.Entities.Dto.RoomConversationDto;
import api.chat.Entities.RoomConversation;
import api.chat.Repositorys.MessageRepository;
import api.chat.Repositorys.RoomConversationRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
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
