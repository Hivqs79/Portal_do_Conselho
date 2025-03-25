package net.weg.userapi.repository;

import net.weg.userapi.model.entity.annotation.AnnotationClass;
import net.weg.userapi.model.entity.classes.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AnnotationClassRepository extends JpaRepository<AnnotationClass, Long>, JpaSpecificationExecutor<AnnotationClass> {
}
