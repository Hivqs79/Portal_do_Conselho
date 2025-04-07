package net.weg.general_api.service;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.entity.feedback.FeedbackStudent;
import net.weg.general_api.service.feedback.FeedbackStudentService;
import net.weg.general_api.service.users.StudentService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class DashboardService {

    //Services necessarias
    FeedbackStudentService feedbackStudentService;

}
