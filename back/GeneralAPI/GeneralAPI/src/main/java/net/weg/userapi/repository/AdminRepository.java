package net.weg.userapi.repository;

import net.weg.userapi.model.entity.users.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
}
