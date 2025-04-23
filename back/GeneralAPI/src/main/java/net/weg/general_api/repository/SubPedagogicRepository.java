package net.weg.general_api.repository;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import net.weg.general_api.model.entity.users.Admin;
import net.weg.general_api.model.entity.users.SubPedagogic;
import net.weg.general_api.model.entity.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface SubPedagogicRepository extends JpaRepository<SubPedagogic, Long>, JpaSpecificationExecutor<SubPedagogic> {

    default Page<SubPedagogic> getAllByEnabledIsTrue(Specification<SubPedagogic> spec, Pageable pageable) {
        Specification<SubPedagogic> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> {
                    // Faz o join com UserAuthentication e verifica o campo enabled
                    Join<SubPedagogic, User> userJoin = root.join("userAuthentication", JoinType.INNER);
                    return cb.isTrue(userJoin.get("enabled"));
                });

        return findAll(enabledSpec, pageable);
    }

}
