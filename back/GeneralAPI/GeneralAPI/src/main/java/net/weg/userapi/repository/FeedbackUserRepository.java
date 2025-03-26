package net.weg.userapi.repository;

import net.weg.userapi.model.entity.feedback.FeedbackUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface FeedbackUserRepository extends JpaRepository<FeedbackUser, Long>, JpaSpecificationExecutor<FeedbackUser> {
    List<FeedbackUser> getAllByUser_Id(Long id);

    Page<FeedbackUser> findAllByCouncil_Id(Long id, Pageable pageable);

    boolean existsFeedbackUserByCouncil_IdAndAndUser_Id(Long council_id, Long user_id);

}
