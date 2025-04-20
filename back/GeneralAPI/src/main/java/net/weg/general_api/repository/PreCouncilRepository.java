package net.weg.general_api.repository;

import net.weg.general_api.model.entity.preCouncil.PreCouncil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PreCouncilRepository extends JpaRepository<PreCouncil, Long>, JpaSpecificationExecutor<PreCouncil> {
    default Page<PreCouncil> getAllByEnabledIsTrue(Specification<PreCouncil> spec, Pageable pageable) {
        Specification<PreCouncil> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")));

        return findAll(enabledSpec, pageable);
    }

    @Query("SELECT p FROM PreCouncil p WHERE p.aClass.id = :aClassId AND p.answered = :answered")
    List<PreCouncil> findPreCouncilByAClassIdAndAnswered(@Param("aClassId") Long aClassId, @Param("answered") boolean answered);
}
