package net.weg.userapi.repository;

import net.weg.userapi.model.entity.preCouncil.PreCouncil;
import net.weg.userapi.model.entity.users.Pedagogic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PreCouncilRepository extends JpaRepository<PreCouncil, Long>, JpaSpecificationExecutor<PreCouncil> {
    default Page<PreCouncil> getAllByEnabledIsTrue(Specification<PreCouncil> spec, Pageable pageable) {
        Specification<PreCouncil> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")));

        return findAll(enabledSpec, pageable);
    }
}
