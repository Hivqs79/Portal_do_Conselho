package net.weg.userapi.repository;

import net.weg.userapi.model.entity.feedback.FeedbackClass;
import net.weg.userapi.model.entity.feedback.FeedbackStudent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface FeedbackStudentRepository extends JpaRepository<FeedbackStudent, Long>, JpaSpecificationExecutor<FeedbackStudent> {

    boolean existsFeedbackStudentByCouncil_IdAndStudent_Id(Long council_id, Long student_id);
    Page<FeedbackStudent> getAllByEnabled(boolean enabled, Pageable pageable);


}
