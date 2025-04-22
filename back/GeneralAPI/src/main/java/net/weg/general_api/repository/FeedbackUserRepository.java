package net.weg.general_api.repository;

import net.weg.general_api.model.entity.feedback.FeedbackStudent;
import net.weg.general_api.model.entity.feedback.FeedbackUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedbackUserRepository extends JpaRepository<FeedbackUser, Long>, JpaSpecificationExecutor<FeedbackUser> {

    boolean existsFeedbackUserByPreCouncil_IdAndAndUser_Id(Long pre_council_id, Long user_id);

    default Page<FeedbackUser> getAllByEnabledIsTrue(Specification<FeedbackUser> spec, Pageable pageable) {
        Specification<FeedbackUser> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")));

        return findAll(enabledSpec, pageable);
    }
}
