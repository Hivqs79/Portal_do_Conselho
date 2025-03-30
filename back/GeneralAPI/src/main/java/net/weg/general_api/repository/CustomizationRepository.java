package net.weg.general_api.repository;

import net.weg.general_api.model.entity.users.Customization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface CustomizationRepository extends JpaRepository<Customization, Long>, JpaSpecificationExecutor<Customization> {
    Optional<Customization> findByUser_Id(Long userId);
}
