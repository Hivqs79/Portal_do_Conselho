package spring.emailsenderapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import spring.emailsenderapi.model.EmailModel;

@Repository
public interface EmailRepository extends JpaRepository<EmailModel, Long> {
}
