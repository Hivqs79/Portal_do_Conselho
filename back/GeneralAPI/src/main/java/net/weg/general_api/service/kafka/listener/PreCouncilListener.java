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

package net.weg.general_api.service.kafka.listener;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.request.annotation.AnnotationClassRequestDTO;
import net.weg.general_api.model.dto.request.annotation.AnnotationStudentRequestDTO;
import net.weg.general_api.model.dto.request.feedback.FeedbackUserRequestDTO;
import net.weg.general_api.model.dto.request.preCouncil.PreCouncilSectionRequestDTO;
import net.weg.general_api.model.dto.response.preCouncil.PreCouncilResponseDTO;
import net.weg.general_api.model.dto.response.preCouncil.PreCouncilSectionResponseDTO;
import net.weg.general_api.model.dto.response.users.TeacherResponseDTO;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.feedback.FeedbackUser;
import net.weg.general_api.model.entity.notification.Notification;
import net.weg.general_api.model.entity.preCouncil.PreCouncil;
import net.weg.general_api.model.entity.preCouncil.PreCouncilSection;
import net.weg.general_api.model.entity.users.Pedagogic;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.model.enums.RankENUM;
import net.weg.general_api.service.annotations.AnnotationClassService;
import net.weg.general_api.service.annotations.AnnotationStudentService;
import net.weg.general_api.service.classes.ClassService;
import net.weg.general_api.service.council.CouncilService;
import net.weg.general_api.service.feedback.FeedbackUserService;
import net.weg.general_api.service.kafka.entity.KafkaMessage;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import net.weg.general_api.service.preCouncil.PreCouncilSectionService;
import net.weg.general_api.service.preCouncil.PreCouncilService;
import net.weg.general_api.service.users.PedagogicService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PreCouncilListener {

    private final ObjectMapper objectMapper;
    private final PreCouncilService preCouncilService;
    private final PreCouncilSectionService preCouncilSectionService;
    private final FeedbackUserService feedbackUserService;
    private final ClassService classService;
    private final PedagogicService pedagogicService;
    private final KafkaEventSender kafkaEventSender;

    @KafkaListener(topics = "precouncil", groupId = "group_general_api")
    public void consumePreCouncil(String message) throws JsonProcessingException {
        System.out.println("Consumed message: " + message);
        KafkaMessage kafkaMessage = objectMapper.readValue(message, KafkaMessage.class);
        String httpMethod = kafkaMessage.getHttpMethod();
        System.out.println("httpMethod: " + httpMethod);

        if (httpMethod.equals("POST")) {
            createSections(getPreCouncilByMessage(kafkaMessage));
        };
        if (httpMethod.equals("PATCH") && kafkaMessage.getDescription().equals("Pre-council finalized")) {
            createFeedbacks(getPreCouncilByMessage(kafkaMessage));
        };
    }

    private void createSections(PreCouncil preCouncil) {

        detectIfSectionExistAndCreate(
                preCouncil.getId(),
                "Supervisores de Curso",
                "Disseminação de Informações, disponibilidade para atendimento,tratamento das solicitações, planejamento e acompanhamento do processo de ensino e aprendizagem."
        );

        detectIfSectionExistAndCreate(
                preCouncil.getId(),
                "Orientação Pedagógica",
                "Disponibilidade para atendimento, tratamento das solicitações, planejamento e acompanhamento do processo de ensino e aprendizagem."
        );

        detectIfSectionExistAndCreate(
                preCouncil.getId(),
                "Recursos Pedagógicos",
                "Espaço do Estudante / Ambiente Virtual de Aprendizagem/ Sala de aula/ ferramentas online"
        );

        detectIfSectionExistAndCreate(
                preCouncil.getId(),
                "Auto avaliação da Classe",
                "Interação dos estudantes, respeito pela opinião do outro, cumprimento de atividades e prazos, frequência, respeito pelos docentes e colegas, colaboração, visão positiva sobre a Instituição."
        );

        for (Teacher teacher : preCouncil.getTeachers()) {
//            Notification notification = Notification.builder()
//                    .title("Novo pré-conselho disponível!")
//                    .message("O conselho da turma: " + preCouncil.getAClass().getName() + " iniciado")
//                    .userId(teacher.getId())
//                    .build();

//                kafkaEventSender.sendNotification(notification);

            detectIfSectionExistAndCreate(
                    preCouncil.getId(),
                    teacher.getName(),
                    "Teacher section"
            );
        }
    }

    private void detectIfSectionExistAndCreate(Long preCouncilId, String topic, String description) {
        if (!preCouncilSectionService.existPreCouncilSectionByPreCouncilAndTopic(
                preCouncilId,
                topic
        )) {
            preCouncilSectionService.createPreCouncilSection(
                    new PreCouncilSectionRequestDTO(
                            preCouncilId,
                            topic,
                            description,
                            "",
                            ""
                    )
            );
        }
    }

    private PreCouncil getPreCouncilByMessage(KafkaMessage kafkaMessage) {
        String regex = "PreCouncil\\{\\s*id=(\\d+).*";
        Long preCouncilId = Long.parseLong(kafkaMessage.getObject().replaceAll(regex, "$1"));
        System.out.println("Id of pre-council: " + preCouncilId);
        return  preCouncilService.findPreCouncilEntity(preCouncilId);
    }


    private void createFeedbacks(PreCouncil preCouncil) {
        List<PreCouncilSectionResponseDTO> preCouncilSectionList = preCouncilSectionService.getAllByPreCouncilId(preCouncil.getId());

        for (PreCouncilSectionResponseDTO preCouncilSectionDTO : preCouncilSectionList) {
            if (preCouncilSectionDTO.getDescription().equals("Teacher section")) {
                List<TeacherResponseDTO> teachersList = classService.getTeacherByClass(preCouncilSectionDTO.getPreCouncil().getAClass().getId());
                Long teacherId = -1L;
                for (TeacherResponseDTO teacher : teachersList) {
                    if (teacher.getName().equals(preCouncilSectionDTO.getTopic())) {
                        teacherId = teacher.getId();
                    }
                }
                if (teacherId == -1L) {
                    System.err.println("Teacher with name " + preCouncilSectionDTO.getTopic() + " not found");
                    continue;
                }
                feedbackUserService.createFeedbackUser(
                        new FeedbackUserRequestDTO(
                                preCouncil.getId(),
                                preCouncilSectionDTO.getStrengths(),
                                preCouncilSectionDTO.getToImprove(),
                                teacherId
                        )
                );
                continue;
            }
            if (preCouncilSectionDTO.getTopic().equals("Supervisores de Curso")) {
                //TODO: make the supervisor feedback when use security
            }
            if (preCouncilSectionDTO.getTopic().equals("Orientação Pedagógica")) {
                for (Pedagogic pedagogic : pedagogicService.findAllPedagogicEntity()) {
                    feedbackUserService.createFeedbackUser(
                            new FeedbackUserRequestDTO(
                                    preCouncil.getId(),
                                    preCouncilSectionDTO.getStrengths(),
                                    preCouncilSectionDTO.getToImprove(),
                                    pedagogic.getId()
                            )
                    );
                }
            }
        }
    }
}
