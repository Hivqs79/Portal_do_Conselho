package net.weg.general_api.model.entity.notification;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    @NotBlank
    private String title;

    @Column(nullable = false)
    @NotBlank
    private String message;

    @Column(nullable = false)
    private LocalDateTime messageDateTime;

    @Column(nullable = false)
    private boolean enabled;

    @PrePersist
    public void onPrePersist() {
        this.setEnabled(true);
        this.setMessageDateTime(LocalDateTime.now());
    }

    @Enumerated(EnumType.STRING)
    private NotificationStatus status;

    public enum NotificationStatus {
        PENDING,
        RECEIVED,
        READ
    }
}
