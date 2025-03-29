package net.weg.userapi.repository;

import net.weg.userapi.model.entity.preCouncil.PreCouncil;
import net.weg.userapi.model.entity.preCouncil.PreCouncilSection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PreCouncilSectionRepository extends JpaRepository<PreCouncilSection, Long>, JpaSpecificationExecutor<PreCouncilSection> {
    default Page<PreCouncilSection> getAllByEnabledIsTrue(Specification<PreCouncilSection> spec, Pageable pageable) {
        Specification<PreCouncilSection> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")));

        return findAll(enabledSpec, pageable);
    }
}
