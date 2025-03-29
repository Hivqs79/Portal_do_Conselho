package net.weg.userapi.repository;

import net.weg.userapi.model.entity.annotation.AnnotationStudent;
import net.weg.userapi.model.entity.classes.Class;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ClassRepository extends JpaRepository<Class, Long>, JpaSpecificationExecutor<Class> {
    Page<Class> getAllByEnabled(boolean enabled, Pageable pageable);

}
