package net.weg.general_api.repository;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.model.entity.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TeacherRepository extends JpaRepository<Teacher, Long>, JpaSpecificationExecutor<Teacher> {

    default Page<Teacher> getAllByEnabledIsTrue(Specification<Teacher> spec, Pageable pageable) {
        Specification<Teacher> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> {
                    // Faz o join com UserAuthentication e verifica o campo enabled
                    Join<Teacher, User> userJoin = root.join("userAuthentication", JoinType.INNER);
                    return cb.isTrue(userJoin.get("enabled"));
                });

        return findAll(enabledSpec, pageable);
    }

    default Page<Teacher> findAllByClassIdAndSpec(Long classId, Specification<Teacher> spec, Pageable pageable) {
        Specification<Teacher> finalSpec = Specification.where(spec)
                .and((root, query, cb) -> {
                    // Join com a tabela de classes (ManyToMany)
                    Join<Teacher, Class> classJoin = root.join("classes");
                    // Filtra pelo ID da classe
                    return cb.equal(classJoin.get("id"), classId);
                })
                .and((root, query, cb) -> {
                    // Verifica se o usuário está ativo (enabled = true)
                    Join<Teacher, User> userJoin = root.join("userAuthentication", JoinType.INNER);
                    return cb.isTrue(userJoin.get("enabled"));
                });

        return findAll(finalSpec, pageable);
    }


}
