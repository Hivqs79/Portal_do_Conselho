package net.weg.userapi.repository;

import net.weg.userapi.model.entity.feedback.FeedbackClass;
import net.weg.userapi.model.entity.feedback.FeedbackUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackClassRepository extends JpaRepository<FeedbackClass, Integer> {
}
