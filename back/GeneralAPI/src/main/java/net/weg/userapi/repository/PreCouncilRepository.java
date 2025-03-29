package net.weg.userapi.repository;

import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.model.entity.preCouncil.PreCouncil;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PreCouncilRepository extends JpaRepository<PreCouncil, Long>, JpaSpecificationExecutor<PreCouncil> {
}
