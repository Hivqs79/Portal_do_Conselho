package net.weg.userapi.repository;

import net.weg.userapi.model.entity.users.Customization;
import net.weg.userapi.model.entity.users.User;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface CustomizationRepository extends JpaRepository<Customization, Long>, JpaSpecificationExecutor<Customization> {
    Optional<Customization> findByUser_Id(Long userId);
}
