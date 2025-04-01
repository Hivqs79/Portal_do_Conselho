package net.weg.general_api.controller.notification;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.entity.notification.Notification;
import net.weg.general_api.repository.NotificationRepository;
import net.weg.general_api.service.notification.NotificationService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notification")
@AllArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public Page<Notification> getNotifications(
            @RequestParam(required = false) Long userId,
            Pageable pageable) {
        Specification<Notification> spec = Specification.where((root, query, cb) -> cb.conjunction());

        if (userId != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("userId"), userId));
        }

        return notificationService.getNotifications(spec, pageable);
    }

    @GetMapping("/{id}")
    public Notification getNotificationById(@PathVariable Long id) {
        return notificationService.findNotificationById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
    }

    @GetMapping("/user/{id}")
    public Page<Notification> getNotificationsByUserId(@PathVariable Long id, Pageable pageable) {
        return notificationService.getNotificationsByUserId(id, pageable);
    }

    @PatchMapping("/{id}/is-viewed")
    public void updateNotificationStatus(
            @PathVariable Long id,
            @RequestParam boolean isViewed) {
        notificationService.updateNotificationStatus(id, isViewed);
    }

    @PatchMapping("/{id}/disable")
    public void disableNotification(@PathVariable Long id) {
        notificationService.disableNotification(id);
    }
}
