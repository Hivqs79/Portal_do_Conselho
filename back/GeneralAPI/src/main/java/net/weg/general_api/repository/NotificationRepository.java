package net.weg.general_api.repository;


import net.weg.general_api.model.entity.notification.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface NotificationRepository extends JpaRepository<Notification, Long>, JpaSpecificationExecutor<Notification> {
    default Page<Notification> getAllByEnabledIsTrue(Specification<Notification> spec, Pageable pageable) {
        Specification<Notification> enabledSpec = Specification.where(spec)
                .and((root, query, cb) -> cb.isTrue(root.get("enabled")));

        return findAll(enabledSpec, pageable);
    }

    default Page<Notification> getNotificationsByUserId(Long id, Pageable pageable) {
        return findAll((root, query, cb) -> cb.and(
                cb.equal(root.get("userId"), id),
                cb.isTrue(root.get("enabled"))
        ), pageable);
    };

}
