package net.weg.userapi.repository;

import net.weg.userapi.model.entity.classes.Class;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<Class, Integer> {
}
