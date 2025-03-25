package net.weg.userapi.repository;

import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.model.entity.feedback.FeedbackUser;
import net.weg.userapi.model.entity.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Range;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface FeedbackUserRepository extends JpaRepository<FeedbackUser, Long>, JpaSpecificationExecutor<FeedbackUser> {
    List<FeedbackUser> getAllByUser_Id(Long id);

    Page<FeedbackUser> findAllByCouncil_Id(Long id, Pageable pageable);
}
