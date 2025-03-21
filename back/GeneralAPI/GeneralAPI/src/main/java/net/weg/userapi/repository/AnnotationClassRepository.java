package net.weg.userapi.repository;

import net.weg.userapi.model.entity.annotation.AnnotationClass;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnotationClassRepository extends JpaRepository<AnnotationClass, Integer> {
}
