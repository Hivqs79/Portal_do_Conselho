package net.weg.userapi.repository;

import net.weg.userapi.model.entity.feedback.FeedbackUser;
import net.weg.userapi.model.entity.users.Pedagogic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface PedagogicRepository extends JpaRepository<Pedagogic, Long>, JpaSpecificationExecutor<Pedagogic> {
    Page<Pedagogic> getAllByEnabled(boolean enabled, Pageable pageable);

}
