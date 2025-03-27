package net.weg.userapi.repository;

import net.weg.userapi.model.entity.users.Teacher;
import net.weg.userapi.model.entity.users.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    Page<User> getAllByEnabled(boolean enabled, Pageable pageable);

}
