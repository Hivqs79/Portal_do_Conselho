package net.weg.userapi.repository;

import net.weg.userapi.model.entity.feedback.FeedbackUser;
import net.weg.userapi.model.entity.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackUserRepository extends JpaRepository<FeedbackUser, Integer> {
    List<FeedbackUser> getAllByUser_Id(Integer id);
}
