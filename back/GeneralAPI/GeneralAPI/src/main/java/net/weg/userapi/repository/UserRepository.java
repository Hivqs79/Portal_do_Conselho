package net.weg.userapi.repository;

import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.model.entity.users.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {
}
