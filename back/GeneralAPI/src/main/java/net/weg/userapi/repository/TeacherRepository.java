package net.weg.userapi.repository;

import net.weg.userapi.model.entity.preCouncil.PreCouncilSection;
import net.weg.userapi.model.entity.users.Student;
import net.weg.userapi.model.entity.users.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TeacherRepository extends JpaRepository<Teacher, Long>, JpaSpecificationExecutor<Teacher> {
    default Page<Teacher> getAllByEnabledIsTrue(Specification<Teacher> spec, Pageable pageable) {
        Specification<Teacher> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")));

        return findAll(enabledSpec, pageable);
    }
}
