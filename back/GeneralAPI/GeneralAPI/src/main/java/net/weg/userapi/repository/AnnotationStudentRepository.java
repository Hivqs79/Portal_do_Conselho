package net.weg.userapi.repository;

import net.weg.userapi.model.entity.annotation.AnnotationClass;
import net.weg.userapi.model.entity.annotation.AnnotationStudent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AnnotationStudentRepository extends JpaRepository<AnnotationStudent, Long>, JpaSpecificationExecutor<AnnotationStudent> {

    Page<AnnotationStudent> findAllByStudent_Id(Pageable pageable, Long id);

    Page<AnnotationStudent> getAllByEnabled(boolean enabled, Pageable pageable);

}
