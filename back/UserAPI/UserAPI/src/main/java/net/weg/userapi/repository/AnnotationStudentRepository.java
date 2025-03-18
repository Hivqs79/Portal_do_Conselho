package net.weg.userapi.repository;

import net.weg.userapi.model.entity.annotation.AnnotationStudent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnnotationStudentRepository extends JpaRepository<AnnotationStudent, Integer> {

    Page<AnnotationStudent> findAllByStudent_Id(Pageable pageable, Integer id);

}
