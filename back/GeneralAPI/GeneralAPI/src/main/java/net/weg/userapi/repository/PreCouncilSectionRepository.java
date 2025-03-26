package net.weg.userapi.repository;

import net.weg.userapi.model.entity.preCouncil.PreCouncilSection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PreCouncilSectionRepository extends JpaRepository<PreCouncilSection, Long>, JpaSpecificationExecutor<PreCouncilSection> {
}
