package net.weg.userapi.repository;

import net.weg.userapi.model.entity.council.Council;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouncilRepository extends JpaRepository<Council, Integer> {
}
