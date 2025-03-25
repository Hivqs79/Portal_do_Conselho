package net.weg.userapi.repository;

import net.weg.userapi.model.entity.annotation.Annotation;
import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.model.entity.council.Council;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface CouncilRepository extends JpaRepository<Council, Long>, JpaSpecificationExecutor<Council> {
}
