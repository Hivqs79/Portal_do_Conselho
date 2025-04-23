package net.weg.general_api.repository;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import net.weg.general_api.model.entity.users.Pedagogic;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.entity.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long>, JpaSpecificationExecutor<Student> {

    default Page<Student> getAllByEnabledIsTrue(Specification<Student> spec, Pageable pageable) {
        Specification<Student> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> {
                    // Faz o join com UserAuthentication e verifica o campo enabled
                    Join<Student, User> userJoin = root.join("userAuthentication", JoinType.INNER);
                    return cb.isTrue(userJoin.get("enabled"));
                });

        return findAll(enabledSpec, pageable);
    }

    List<Student> getAllByLastFrequencyGreaterThan(double frequency);

    @Query("SELECT DISTINCT s FROM Student s " +
            "JOIN s.classes c " +
            "WHERE LOWER(c.name) LIKE LOWER(concat('%', :className, '%')) " +
            "AND s.lastFrequency > :frequency")
    List<Student> findByClassNameAndFrequency(
            @Param("className") String name,
            @Param("frequency") double frequency);

}
