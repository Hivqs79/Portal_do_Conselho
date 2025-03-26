package net.weg.userapi.repository;

import net.weg.userapi.model.entity.feedback.FeedbackClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FeedbackClassRepository extends JpaRepository<FeedbackClass, Long>, JpaSpecificationExecutor<FeedbackClass> {

    boolean existsFeedbackClassByCouncil_Id(Long council_id);

}

