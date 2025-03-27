package net.weg.userapi.repository;

import net.weg.userapi.model.entity.users.Admin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AdminRepository extends JpaRepository<Admin, Long>, JpaSpecificationExecutor<Admin> {
    Page<Admin> getAllByEnabled(boolean enabled, Pageable pageable);
}
