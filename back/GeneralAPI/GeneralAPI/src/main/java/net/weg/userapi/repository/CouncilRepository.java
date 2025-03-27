package net.weg.userapi.repository;

import net.weg.userapi.model.entity.annotation.AnnotationStudent;
import net.weg.userapi.model.entity.council.Council;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CouncilRepository extends JpaRepository<Council, Long>, JpaSpecificationExecutor<Council> {
    Page<Council> getAllByEnabled(boolean enabled, Pageable pageable);

}
