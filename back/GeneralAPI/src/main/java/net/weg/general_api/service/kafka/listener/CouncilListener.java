package net.weg.general_api.service.kafka.listener;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.request.annotation.AnnotationClassRequestDTO;
import net.weg.general_api.model.dto.request.annotation.AnnotationStudentRequestDTO;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.notification.Notification;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.model.enums.RankENUM;
import net.weg.general_api.service.annotations.AnnotationClassService;
import net.weg.general_api.service.annotations.AnnotationStudentService;
import net.weg.general_api.service.council.CouncilService;
import net.weg.general_api.service.kafka.producer.KafkaEventSender;
import net.weg.general_api.service.kafka.entity.KafkaMessage;
import net.weg.general_api.service.preCouncil.PreCouncilService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CouncilListener {

    private final ObjectMapper objectMapper;
    private final AnnotationClassService annotationClassService;
    private final AnnotationStudentService annotationStudentService;
    private final CouncilService councilService;
    private final PreCouncilService preCouncilService;
    private final KafkaEventSender kafkaEventSender;

//    @KafkaListener(topics = "student", groupId = "group_general_api")
//    public void consume(String message) {
//        System.out.println("logDoBackend" + "Consumed message: " + message);
//    }

    @KafkaListener(topics = "council", groupId = "group_general_api")
    public void consumeCouncil(String message) throws JsonProcessingException {
        System.out.println("Consumed message: " + message);
        KafkaMessage kafkaMessage = objectMapper.readValue(message, KafkaMessage.class);
        String httpMethod = kafkaMessage.getHttpMethod();
        System.out.println("httpMethod: " + httpMethod);

        if (!httpMethod.equals("POST")) return;

        String regex = "Council\\{\\s*id=(\\d+).*";
        Long councilId = Long.parseLong(kafkaMessage.getObject().replaceAll(regex, "$1"));
        System.out.println("Id of council: " + councilId);
        Council council = councilService.findCouncilEntity(councilId);

        for (Teacher teacher : council.getTeachers()) {
            Notification notification = Notification.builder()
                    .title("Novo conselho iniciado!")
                    .message("O conselho da turma: " + council.getAClass().getName() + " iniciado")
                    .userId(teacher.getId())
                    .build();

            if (!annotationClassService.existsByTeacherAndCouncil(teacher.getId(), council.getId())) {
                annotationClassService.createAnnotationClass(
                        new AnnotationClassRequestDTO(
                                RankENUM.NONE,
                                "",
                                "",
                                teacher.getId(),
                                council.getId()
                        )
                );
                kafkaEventSender.sendNotification(notification);
            }

            for (Student student : council.getAClass().getStudents()) {
                if (!annotationStudentService.existsByTeacherCouncilAndStudent(
                        teacher.getId(), council.getId(), student.getId())) {
                    annotationStudentService.createAnnotationStudent(
                            new AnnotationStudentRequestDTO(
                                    RankENUM.NONE,
                                    student.getLastFrequency(),
                                    "",
                                    "",
                                    teacher.getId(),
                                    council.getId(),
                                    student.getId()
                            )
                    );
                }
            }
        }
    }

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
        Council council = councilService.findCouncilEntity(preCouncilId);

        for (Teacher teacher : council.getTeachers()) {
            Notification notification = Notification.builder()
                    .title("Novo conselho iniciado!")
                    .message("O conselho da turma: " + council.getAClass().getName() + " iniciado")
                    .userId(teacher.getId())
                    .build();

            if (!annotationClassService.existsByTeacherAndCouncil(teacher.getId(), council.getId())) {
                annotationClassService.createAnnotationClass(
                        new AnnotationClassRequestDTO(
                                RankENUM.NONE,
                                "",
                                "",
                                teacher.getId(),
                                council.getId()
                        )
                );
                kafkaEventSender.sendNotification(notification);
            }

            for (Student student : council.getAClass().getStudents()) {
                if (!annotationStudentService.existsByTeacherCouncilAndStudent(
                        teacher.getId(), council.getId(), student.getId())) {
                    annotationStudentService.createAnnotationStudent(
                            new AnnotationStudentRequestDTO(
                                    RankENUM.NONE,
                                    student.getLastFrequency(),
                                    "",
                                    "",
                                    teacher.getId(),
                                    council.getId(),
                                    student.getId()
                            )
                    );
                }
            }
        }
    }
}
