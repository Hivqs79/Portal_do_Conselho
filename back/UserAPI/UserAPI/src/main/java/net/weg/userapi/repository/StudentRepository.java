package net.weg.userapi.repository;

import net.weg.userapi.model.entity.users.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}
