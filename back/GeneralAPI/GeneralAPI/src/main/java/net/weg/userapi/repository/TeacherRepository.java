package net.weg.userapi.repository;

import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.model.entity.users.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TeacherRepository extends JpaRepository<Teacher, Long>, JpaSpecificationExecutor<Teacher> {
}
