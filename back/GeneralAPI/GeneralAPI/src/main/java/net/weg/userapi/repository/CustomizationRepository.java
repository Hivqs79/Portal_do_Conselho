package net.weg.userapi.repository;

import net.weg.userapi.model.entity.users.Customization;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CustomizationRepository extends JpaRepository<Customization, Long>, JpaSpecificationExecutor<Customization> {
}
