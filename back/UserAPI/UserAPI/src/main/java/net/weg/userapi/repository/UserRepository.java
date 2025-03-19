package net.weg.userapi.repository;

import net.weg.userapi.model.entity.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
