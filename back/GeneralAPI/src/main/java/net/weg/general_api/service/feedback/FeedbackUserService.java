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

package net.weg.general_api.service.feedback;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.FeedbackNotFoundException;
import net.weg.general_api.exception.exceptions.StudentFeedbackAlreadyExistException;
import net.weg.general_api.exception.exceptions.UserFeedbackAlreadyExistException;
import net.weg.general_api.model.dto.request.feedback.FeedbackUserRequestDTO;
import net.weg.general_api.model.dto.response.feedback.FeedbackUserResponseDTO;
import net.weg.general_api.model.dto.response.preCouncil.PreCouncilResponseDTO;
import net.weg.general_api.model.dto.response.users.UserResponseDTO;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.feedback.FeedbackUser;
import net.weg.general_api.model.entity.preCouncil.PreCouncil;
import net.weg.general_api.model.entity.users.User;
import net.weg.general_api.repository.FeedbackUserRepository;
import net.weg.general_api.service.council.CouncilService;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import net.weg.general_api.service.preCouncil.PreCouncilService;
import net.weg.general_api.service.users.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FeedbackUserService {

    private FeedbackUserRepository repository;
    private PreCouncilService preCouncilService;
    private UserService userService;
    private ModelMapper modelMapper;
    private final KafkaEventSender kafkaEventSender;

    public Page<FeedbackUserResponseDTO> findFeedbackUserSpec(Specification<FeedbackUser> spec, Pageable pageable) {
        try {
            Page<FeedbackUser> feedbackUsers = repository.getAllByEnabledIsTrue(spec, pageable);
            System.out.println(feedbackUsers.getContent());
            return pageToResponse(feedbackUsers);
        } catch(Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
        return null;
    }

    public Page<FeedbackUserResponseDTO> findFeedbackUserSpecByUserId(Specification<FeedbackUser> spec, Pageable pageable, Long userId) {
        try {
            Page<FeedbackUser> feedbackUsers = repository.getAllByEnabledIsTrueAndUserId(spec, pageable, userId);
            System.out.println(feedbackUsers.getContent());
            return pageToResponse(feedbackUsers);
        } catch(Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
        return null;
    }

    public FeedbackUserResponseDTO createFeedbackUser(FeedbackUserRequestDTO feedbackUserRequestDTO) {

        if (repository.existsFeedbackUserByPreCouncil_IdAndUser_Id(feedbackUserRequestDTO.getPre_council_id(), feedbackUserRequestDTO.getUser_id())) {
            throw new StudentFeedbackAlreadyExistException("Student feedback already exists");
        }

        PreCouncil preCouncil = preCouncilService.findPreCouncilEntity(feedbackUserRequestDTO.getPre_council_id());
        User user = userService.findUserEntity(feedbackUserRequestDTO.getUser_id());

        FeedbackUser feedbackUser = modelMapper.map(feedbackUserRequestDTO, FeedbackUser.class);
        feedbackUser.setPreCouncil(preCouncil); //SETAR CONSELHO
        feedbackUser.setUser(user); //SETAR USUARIO

        FeedbackUser feedbackSaved = repository.save(feedbackUser);
        kafkaEventSender.sendEvent(feedbackSaved, "POST", "Feedback User created");

        return modelMapper.map(feedbackSaved, FeedbackUserResponseDTO.class);
    }

    public FeedbackUserResponseDTO findFeedbackUser(Long id) {
        FeedbackUser feedbackUser = findFeedbackEntity(id);

        return modelMapper.map(feedbackUser, FeedbackUserResponseDTO.class);
    }

    public FeedbackUser findFeedbackEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new FeedbackNotFoundException("Class feedback not found"));
    }

    public FeedbackUserResponseDTO updateFeedbackUser(FeedbackUserRequestDTO feedbackUserRequestDTO, Long id) {
        FeedbackUser feedbackUser = this.findFeedbackEntity(id);
        feedbackUser.setStrengths(feedbackUserRequestDTO.getStrengths());
        feedbackUser.setToImprove(feedbackUserRequestDTO.getToImprove());

        FeedbackUser updatedFeedbackUser = repository.save(feedbackUser);
        kafkaEventSender.sendEvent(updatedFeedbackUser, "PUT", "Feedback User updated");
        return modelMapper.map(updatedFeedbackUser, FeedbackUserResponseDTO.class);
    }

    public FeedbackUserResponseDTO disableFeedbackUser(Long id) {
        FeedbackUser feedbackUser = findFeedbackEntity(id);
        feedbackUser.setEnabled(false);
        repository.save(feedbackUser);
        kafkaEventSender.sendEvent(feedbackUser, "DELETE", "Feedback User disabled");
        return modelMapper.map(feedbackUser, FeedbackUserResponseDTO.class);
    }

    public void returnFeedbackUser(Long id) {
        FeedbackUser feedbackUser = findFeedbackEntity(id);
        feedbackUser.setReturned(true);
        repository.save(feedbackUser);
    }

    public void changeSatisfactionUser(Long id, boolean isSatisfied) {
        FeedbackUser feedbackUser = findFeedbackEntity(id);
        feedbackUser.setSatisfied(isSatisfied);
        repository.save(feedbackUser);
    }

    private Page<FeedbackUserResponseDTO> pageToResponse(Page<FeedbackUser> feedbackUsers) {
        return feedbackUsers.map(feedbackUser -> new FeedbackUserResponseDTO(
                feedbackUser.getId(),
                modelMapper.map(feedbackUser.getPreCouncil(), PreCouncilResponseDTO.class),
                feedbackUser.getStrengths(),
                feedbackUser.getToImprove(),
                modelMapper.map(feedbackUser.getUser(), UserResponseDTO.class),
                feedbackUser.isViewed(),
                feedbackUser.isSatisfied(),
                feedbackUser.isReturned(),
                feedbackUser.getCreateDate(),
                feedbackUser.getUpdateDate(),
                feedbackUser.isEnabled()
        ));
    };
}
