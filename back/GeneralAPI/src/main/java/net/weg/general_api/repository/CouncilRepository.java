package net.weg.general_api.repository;

import net.weg.general_api.model.entity.council.Council;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CouncilRepository extends JpaRepository<Council, Long>, JpaSpecificationExecutor<Council> {
    default Page<Council> getAllByEnabledIsTrue(Specification<Council> spec, Pageable pageable) {
        Specification<Council> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")))
                .and((root, query, cb) -> cb.isFalse(root.get("isFinished")));

        return findAll(enabledSpec, pageable);
    }
}
