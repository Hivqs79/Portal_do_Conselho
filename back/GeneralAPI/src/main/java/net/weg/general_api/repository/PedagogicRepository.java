package net.weg.general_api.repository;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import net.weg.general_api.model.entity.users.Pedagogic;
import net.weg.general_api.model.entity.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PedagogicRepository extends JpaRepository<Pedagogic, Long>, JpaSpecificationExecutor<Pedagogic> {
    default Page<Pedagogic> getAllByEnabledIsTrue(Specification<Pedagogic> spec, Pageable pageable) {
        Specification<Pedagogic> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> {
                    // Faz o join com UserAuthentication e verifica o campo enabled
                    Join<Pedagogic, User> userJoin = root.join("userAuthentication", JoinType.INNER);
                    return cb.isTrue(userJoin.get("enabled"));
                });

        return findAll(enabledSpec, pageable);
    }
}
