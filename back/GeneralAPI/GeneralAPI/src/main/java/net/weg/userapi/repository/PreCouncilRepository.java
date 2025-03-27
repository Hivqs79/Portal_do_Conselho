package net.weg.userapi.repository;

import net.weg.userapi.model.entity.preCouncil.PreCouncil;
import net.weg.userapi.model.entity.users.Pedagogic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PreCouncilRepository extends JpaRepository<PreCouncil, Long>, JpaSpecificationExecutor<PreCouncil> {
    Page<PreCouncil> getAllByEnabled(boolean enabled, Pageable pageable);

}
