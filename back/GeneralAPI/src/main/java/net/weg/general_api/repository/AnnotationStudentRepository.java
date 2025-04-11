package net.weg.general_api.repository;

import net.weg.general_api.model.entity.annotation.AnnotationStudent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AnnotationStudentRepository extends JpaRepository<AnnotationStudent, Long>, JpaSpecificationExecutor<AnnotationStudent> {

    Page<AnnotationStudent> findAllByStudent_Id(Pageable pageable, Long id);

    boolean existsByTeacher_IdAndCouncil_IdAndStudent_Id(Long teacherId, Long councilId, Long studentId);

    default Page<AnnotationStudent> getAllByEnabledIsTrue(Specification<AnnotationStudent> spec, Pageable pageable) {
        Specification<AnnotationStudent> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")));

        return findAll(enabledSpec, pageable);
    }
}
