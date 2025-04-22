package net.weg.general_api.service.dashboard;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.dto.response.ClassRankDashboardResponseDTO;
import net.weg.general_api.model.dto.response.FrequencyAvarageDashboardResponseDTO;
import net.weg.general_api.model.dto.response.VisualizedFeedbackDashboardResponseDTO;
import net.weg.general_api.model.dto.response.users.StudentResponseDTO;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.feedback.FeedbackStudent;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.enums.RankENUM;
import net.weg.general_api.service.classes.ClassService;
import net.weg.general_api.service.feedback.FeedbackStudentService;
import net.weg.general_api.service.users.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DashboardService {

    //Services necessarias
    private StudentService studentService;
    private ClassService classService;
    private FeedbackStudentService feedbackStudentService;
    private ModelMapper modelMapper;

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

    public ClassRankDashboardResponseDTO getClassRankDashboard(String className) {

        System.out.println("logDoBackend" + className);
        int excellent = 0, good = 0, average = 0, critical = 0, none = 0;
        Class aClass = classService.getClassByClassName(className);

        if (className.equalsIgnoreCase("geral")) {

            List<FeedbackStudent> feedbackStudents = feedbackStudentService.getLatestFeedbackStudentsFromAllClass();
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

            List<FeedbackStudent> feedbackStudents = feedbackStudentService.getLatestFeedbackStudentsbyClassName(className);
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

    public VisualizedFeedbackDashboardResponseDTO getVisualizedFeedbackDashboard(String className) {
        List<FeedbackStudent> latestFeedbacks = feedbackStudentService.getLatestFeedbackStudentsbyClassName(className);

        if (latestFeedbacks.isEmpty()) {
            return new VisualizedFeedbackDashboardResponseDTO(0, 0, 0.0, 0.0, List.of(), List.of());
        }

        Map<Boolean, List<FeedbackStudent>> partitioned = latestFeedbacks.stream()
                .collect(Collectors.partitioningBy(FeedbackStudent::isViewed));

        List<FeedbackStudent> viewedFeedbacks = partitioned.get(true);
        List<FeedbackStudent> nonViewedFeedbacks = partitioned.get(false);

        // Calcula totais
        int totalViewed = viewedFeedbacks != null ? viewedFeedbacks.size() : 0;
        int totalNonViewed = nonViewedFeedbacks != null ? nonViewedFeedbacks.size() : 0;
        int totalStudents = latestFeedbacks.size();

        // Calcula porcentagens
        double viewedPercent = totalStudents > 0 ? (totalViewed * 100.0) / totalStudents : 0.0;
        double nonViewedPercent = totalStudents > 0 ? (totalNonViewed * 100.0) / totalStudents : 0.0;

        // Extrai listas de estudantes
        List<Student> viewedStudents = viewedFeedbacks != null ?
                viewedFeedbacks.stream().map(FeedbackStudent::getStudent).collect(Collectors.toList()) :
                List.of();


        List<Student> nonViewedStudents = nonViewedFeedbacks != null ?
                nonViewedFeedbacks.stream().map(FeedbackStudent::getStudent).collect(Collectors.toList()) :
                List.of();

        return new VisualizedFeedbackDashboardResponseDTO(
                totalViewed,
                totalNonViewed,
                viewedPercent,
                nonViewedPercent,
                viewedStudents.stream().map(student -> modelMapper.map(student, StudentResponseDTO.class)).toList(),
                nonViewedStudents.stream().map(student -> modelMapper.map(student, StudentResponseDTO.class)).toList()
        );
    }

}
