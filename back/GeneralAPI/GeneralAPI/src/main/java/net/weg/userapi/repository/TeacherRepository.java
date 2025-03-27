package net.weg.userapi.repository;

import net.weg.userapi.model.entity.users.Student;
import net.weg.userapi.model.entity.users.Teacher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TeacherRepository extends JpaRepository<Teacher, Long>, JpaSpecificationExecutor<Teacher> {
    Page<Teacher> getAllByEnabled(boolean enabled, Pageable pageable);

}
