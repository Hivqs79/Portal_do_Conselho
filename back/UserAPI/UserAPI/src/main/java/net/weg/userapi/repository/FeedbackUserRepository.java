package net.weg.userapi.repository;

import net.weg.userapi.model.entity.feedback.FeedbackUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackUserRepository extends JpaRepository<FeedbackUser, Integer> {
}
