package net.weg.general_api.repository;

import net.weg.general_api.model.entity.classes.Class;
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
        Specification<FeedbackStudent> enabledSpec = (root, query, cb) -> {
            // Acessa o atributo da classe pai
            return cb.isTrue(root.get("enabled"));
        };

        return findAll(Specification.where(spec).and(enabledSpec), pageable);
    }

    @Query("SELECT fs FROM FeedbackStudent fs " +
            "JOIN FETCH fs.student " +
            "WHERE fs.id IN (" +
            "   SELECT MAX(fs2.id) FROM FeedbackStudent fs2 " +
            "   JOIN fs2.council c " +
            "   JOIN c.aClass cl " +
            "   WHERE LOWER(cl.name) LIKE LOWER(CONCAT('%', :className, '%')) " +
            "   AND fs2.enabled = true " +
            "   GROUP BY fs2.student.id, YEAR(fs2.createDate)" +
            ")")
    List<FeedbackStudent> findLatestFeedbackByStudentAndClass(
            @Param("className") String className
    );

    @Query("SELECT fs FROM FeedbackStudent fs " +
            "JOIN FETCH fs.student " +
            "WHERE fs.id IN (" +
            "   SELECT MAX(fs2.id) FROM FeedbackStudent fs2 " +
            "   JOIN fs2.council c " +
            "   JOIN c.aClass cl " +
            "   WHERE LOWER(cl.name) LIKE LOWER(CONCAT('%', :className, '%')) " +
            "   AND fs2.enabled = true " +
            "   AND fs2.isViewed = true " +
            "   GROUP BY fs2.student.id, YEAR(fs2.createDate)" +
            ")")
    List<FeedbackStudent> findLatestFeedbackByStudentAndClassAndViewed(
            @Param("className") String className
    );

    @Query("SELECT fs FROM FeedbackStudent fs " +
            "JOIN FETCH fs.student " +
            "WHERE fs.id IN (" +
            "   SELECT MAX(fs2.id) FROM FeedbackStudent fs2 " +
            "   WHERE fs2.enabled = true " +
            "   GROUP BY fs2.student.id, YEAR(fs2.createDate)" +
            ")")
    List<FeedbackStudent> findLatestFeedbackFromAllClasses();

}
