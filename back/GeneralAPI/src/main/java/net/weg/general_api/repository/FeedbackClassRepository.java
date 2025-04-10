package net.weg.general_api.repository;

import net.weg.general_api.model.entity.feedback.FeedbackClass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface FeedbackClassRepository extends JpaRepository<FeedbackClass, Long>, JpaSpecificationExecutor<FeedbackClass> {

    boolean existsFeedbackClassByCouncil_Id(Long council_id);
    default Page<FeedbackClass> getAllByEnabledIsTrue(Specification<FeedbackClass> spec, Pageable pageable) {
        Specification<FeedbackClass> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")));

        return findAll(enabledSpec, pageable);
    }

}

