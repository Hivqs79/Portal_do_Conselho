package net.weg.general_api.service.notification;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationMessage {
    private Long userId;
    private String title;
    private String message;
    private LocalDateTime creationTime;
}
