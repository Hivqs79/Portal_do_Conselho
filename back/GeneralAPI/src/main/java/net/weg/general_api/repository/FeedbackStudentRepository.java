package net.weg.general_api.repository;

import net.weg.general_api.model.entity.feedback.FeedbackStudent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedbackStudentRepository extends JpaRepository<FeedbackStudent, Long>, JpaSpecificationExecutor<FeedbackStudent> {

    boolean existsFeedbackStudentByCouncil_IdAndStudent_Id(Long council_id, Long student_id);
    default Page<FeedbackStudent> getAllByEnabledIsTrue(Specification<FeedbackStudent> spec, Pageable pageable) {
        Specification<FeedbackStudent> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")));

        return findAll(enabledSpec, pageable);
    }

    default Page<FeedbackStudent> getAllByEnabledIsTrueAndStudentId(Specification<FeedbackStudent> spec, Pageable pageable, Long studentId) {
        Specification<FeedbackStudent> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")))
                .and((root, query, cb) -> cb.equal(root.get("student").get("id"), studentId));

        return findAll(enabledSpec, pageable);
    }

    @Query("SELECT fs FROM FeedbackStudent fs " +
            "JOIN fs.council c " +
            "JOIN c.aClass cl " +
            "WHERE YEAR(fs.createDate) = :year " +
            "AND fs.enabled = true " +
            "AND LOWER(cl.name) LIKE LOWER(CONCAT('%', :className, '%'))")
    List<FeedbackStudent> findByYearEnabledAndClassName(
            @Param("year") int year,
            @Param("className") String className
    );

    @Query("SELECT fs FROM FeedbackStudent fs " +
            "WHERE YEAR(fs.createDate) = :year " +
            "AND fs.enabled = true ")
    List<FeedbackStudent> findByYearEnabled(
            @Param("year") int year
    );

}
