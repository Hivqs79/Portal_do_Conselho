package net.weg.userapi.repository;

import net.weg.userapi.model.entity.annotation.AnnotationClass;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AnnotationClassRepository extends JpaRepository<AnnotationClass, Long>, JpaSpecificationExecutor<AnnotationClass> {
    Page<AnnotationClass> getAllByEnabled(boolean enabled, Pageable pageable);
}
