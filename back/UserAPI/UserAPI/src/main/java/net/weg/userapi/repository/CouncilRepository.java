package net.weg.userapi.repository;

import net.weg.userapi.model.entity.annotation.Annotation;
import net.weg.userapi.model.entity.council.Council;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CouncilRepository extends JpaRepository<Council, Integer> {
    List<Council> getAllByaClass_Id(Integer id);
}
