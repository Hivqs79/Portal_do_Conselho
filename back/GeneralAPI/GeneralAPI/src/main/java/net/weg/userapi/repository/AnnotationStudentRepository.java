package net.weg.userapi.repository;

import net.weg.userapi.model.entity.annotation.AnnotationStudent;
import net.weg.userapi.model.entity.classes.Class;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface AnnotationStudentRepository extends JpaRepository<AnnotationStudent, Integer>, JpaSpecificationExecutor<AnnotationStudent> {

    Page<AnnotationStudent> findAllByStudent_Id(Pageable pageable, Integer id);

}
