package net.weg.userapi.repository;

import net.weg.userapi.model.entity.preCouncil.PreCouncil;
import net.weg.userapi.model.entity.preCouncil.PreCouncilSection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PreCouncilSectionRepository extends JpaRepository<PreCouncilSection, Long>, JpaSpecificationExecutor<PreCouncilSection> {
    Page<PreCouncilSection> getAllByEnabled(boolean enabled, Pageable pageable);

}
