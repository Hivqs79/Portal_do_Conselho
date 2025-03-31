package net.weg.general_api.model.dto.request.notification;

import lombok.Data;

@Data
public class NotificationRequestDTO {

    private Long id;
    private Long userId;
    private String title;
    private String message;
}
