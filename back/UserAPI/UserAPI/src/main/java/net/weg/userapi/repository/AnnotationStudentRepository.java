package net.weg.userapi.repository;

import net.weg.userapi.model.entity.annotation.AnnotationStudent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnotationStudentRepository extends JpaRepository<AnnotationStudent, Integer> {
}
