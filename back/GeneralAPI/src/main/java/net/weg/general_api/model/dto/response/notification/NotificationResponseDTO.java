package net.weg.general_api.model.dto.response.notification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.entity.notification.Notification;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponseDTO {

    private Long id;
    private Long userId;
    private String title;
    private String message;
    private LocalDateTime creationTime;
    private Notification.NotificationStatus status;
}