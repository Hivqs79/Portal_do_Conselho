package net.weg.general_api.service.notification;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.entity.notification.Notification;
import net.weg.general_api.repository.NotificationRepository;
import net.weg.general_api.service.kafka.KafkaEventSender;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public Page<Notification> getNotifications(Specification<Notification> spec, Pageable pageable) {
        return notificationRepository.getAllByEnabledIsTrue(spec, pageable);
    }

    public Notification createNotification(Long userId, String title, String message) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setStatus(Notification.NotificationStatus.PENDING);

        return notificationRepository.save(notification);
    }

    public Optional<Notification> findNotificationById(Long id) {
        return notificationRepository.findById(id);
    }

    public void updateNotificationStatus(Long id, Notification.NotificationStatus status) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setStatus(status);
        notificationRepository.save(notification);
    }

    public void disableNotification(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setEnabled(false);
        notificationRepository.save(notification);
    }
}