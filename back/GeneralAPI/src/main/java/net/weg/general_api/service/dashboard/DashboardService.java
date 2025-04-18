package net.weg.general_api.service.dashboard;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.response.ClassRankDashboardResponseDTO;
import net.weg.general_api.model.dto.response.FrequencyAvarageDashboardResponseDTO;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.feedback.FeedbackStudent;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.enums.RankENUM;
import net.weg.general_api.service.classes.ClassService;
import net.weg.general_api.service.feedback.FeedbackStudentService;
import net.weg.general_api.service.users.StudentService;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
public class DashboardService {

    //Services necessarias
    private StudentService studentService;
    private ClassService classService;
    private FeedbackStudentService feedbackStudentService;

    public FrequencyAvarageDashboardResponseDTO getFrequencyAvarageDashboard(String className) {

        System.out.println("logDoBackend" + className);
        double averageFrequency = 0;
        HashMap<String, Double> map = new HashMap<>();
        int count = 0;
        List<Student> studentList;

        if (className.equalsIgnoreCase("geral")) {
            studentList = studentService.getAllStudentsByFrequency();
        } else {
            studentList = studentService.getStudentsByFrequency(className);
        }

        for (Student student : studentList) {
            averageFrequency += student.getLastFrequency();
            count++;
            map.put(student.getName(), student.getLastFrequency());
            System.out.println("logDoBackend" + "Frequencia do aluno " + student.getId() + " : " + student.getLastFrequency() + "\nContador: " + count);
        }

        averageFrequency = averageFrequency / count;

        return new FrequencyAvarageDashboardResponseDTO(className, averageFrequency, map);
    }

    public ClassRankDashboardResponseDTO getClassRankDashboard(String className, int year) {

        System.out.println("logDoBackend" + className);
        int excellent = 0, good = 0, average = 0, critical = 0, none = 0;
        Class aClass = classService.getClassByClassName(className);

        if (className.equalsIgnoreCase("geral")) {

            List<FeedbackStudent> feedbackStudents = feedbackStudentService.getFeedbackStudentsByYear(year);
            for (FeedbackStudent feedbackStudent : feedbackStudents) {
                switch (feedbackStudent.getRank()) {
                    case RankENUM.EXCELLENT:
                        excellent++;
                        break;
                    case RankENUM.GOOD:
                        good++;
                        break;
                    case RankENUM.AVERAGE:
                        average++;
                        break;
                    case RankENUM.CRITICAL:
                        critical++;
                        break;
                    case RankENUM.NONE:
                        none++;
                        break;
                }
            }
            return new ClassRankDashboardResponseDTO(className, excellent, good, average, critical, none, "");
        } else {

            List<FeedbackStudent> feedbackStudents = feedbackStudentService.getFeedbackStudentsByYearAndClassName(year, className);
            for (FeedbackStudent feedbackStudent : feedbackStudents) {
                switch (feedbackStudent.getRank()) {
                    case RankENUM.EXCELLENT:
                        excellent++;
                        break;
                    case RankENUM.GOOD:
                        good++;
                        break;
                    case RankENUM.AVERAGE:
                        average++;
                        break;
                    case RankENUM.CRITICAL:
                        critical++;
                        break;
                    case RankENUM.NONE:
                        none++;
                        break;
                }

            }

            return new ClassRankDashboardResponseDTO(className, excellent, good, average, critical, none, aClass.getLastRank());
        }
    }

}
