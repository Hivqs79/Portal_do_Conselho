package net.weg.general_api.service.kafka.listener;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.request.annotation.AnnotationClassRequestDTO;
import net.weg.general_api.model.dto.request.annotation.AnnotationStudentRequestDTO;
import net.weg.general_api.model.dto.request.preCouncil.PreCouncilSectionRequestDTO;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.notification.Notification;
import net.weg.general_api.model.entity.preCouncil.PreCouncil;
import net.weg.general_api.model.entity.preCouncil.PreCouncilSection;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.model.enums.RankENUM;
import net.weg.general_api.service.annotations.AnnotationClassService;
import net.weg.general_api.service.annotations.AnnotationStudentService;
import net.weg.general_api.service.council.CouncilService;
import net.weg.general_api.service.kafka.entity.KafkaMessage;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import net.weg.general_api.service.preCouncil.PreCouncilSectionService;
import net.weg.general_api.service.preCouncil.PreCouncilService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PreCouncilListener {

    private final ObjectMapper objectMapper;
    private final PreCouncilService preCouncilService;
    private final PreCouncilSectionService preCouncilSectionService;
    private final KafkaEventSender kafkaEventSender;

    @KafkaListener(topics = "precouncil", groupId = "group_general_api")
    public void consumePreCouncil(String message) throws JsonProcessingException {
        System.out.println("Consumed message: " + message);
        KafkaMessage kafkaMessage = objectMapper.readValue(message, KafkaMessage.class);
        String httpMethod = kafkaMessage.getHttpMethod();
        System.out.println("httpMethod: " + httpMethod);

        if (!httpMethod.equals("POST")) return;

        String regex = "PreCouncil\\{\\s*id=(\\d+).*";
        Long preCouncilId = Long.parseLong(kafkaMessage.getObject().replaceAll(regex, "$1"));
        System.out.println("Id of pre-council: " + preCouncilId);
        PreCouncil preCouncil = preCouncilService.findPreCouncilEntity(preCouncilId);

        detectIfSectionExistAndCreate(
                preCouncilId,
                "Supervisores de Curso",
                "Disseminação de Informações, disponibilidade para atendimento,tratamento das solicitações, planejamento e acompanhamento do processo de ensino e aprendizagem."
        );

        detectIfSectionExistAndCreate(
                preCouncilId,
                "Orientação Pedagógica",
                "Disponibilidade para atendimento, tratamento das solicitações, planejamento e acompanhamento do processo de ensino e aprendizagem."
        );

        detectIfSectionExistAndCreate(
                preCouncilId,
                "Recursos Pedagógicos",
                "Espaço do Estudante / Ambiente Virtual de Aprendizagem/ Sala de aula/ ferramentas online"
        );

        detectIfSectionExistAndCreate(
                preCouncilId,
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
                    preCouncilId,
                    teacher.getName(),
                    "Docentes Conteúdo da Unidade Curricular, teoria x prática. Organização e Planejamento das aulas. Domínio do docente em desenvolver as capacidades relacionadas aos conteúdos. Relacionamento Professor X Aluno. Apresenta descrição da aula e organização do conteúdo no ambiente virtual, critérios de avaliação claros, as atividades e conteúdos propostos são coerentes ao tempo de aula."
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
}
