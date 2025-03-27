package net.weg.userapi.repository;

import net.weg.userapi.model.entity.annotation.AnnotationClass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AnnotationClassRepository extends JpaRepository<AnnotationClass, Long>, JpaSpecificationExecutor<AnnotationClass> {
    default Page<AnnotationClass> getAllByEnabledIsTrue(Specification<AnnotationClass> spec, Pageable pageable) {
        Specification<AnnotationClass> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")));

        return findAll(enabledSpec, pageable);
    }
}
