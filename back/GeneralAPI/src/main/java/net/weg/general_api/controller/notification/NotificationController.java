package net.weg.general_api.controller.notification;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Notification Class Controller", description = "Controller para gerenciamento de registros das notificações")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    @Operation(method = "GET", summary = "Get paginated notifications", description = "Retrieve a paginated list of notifications, optionally filtered by user ID")
    @ApiResponse(responseCode = "200", description = "Notifications retrieved successfully",
            content = @Content(schema = @Schema(implementation = Page.class)))
    @Parameter(name = "userId", description = "Optional user ID to filter notifications", example = "1")
    @Parameter(name = "page", description = "Page number (0-based)", example = "0")
    @Parameter(name = "size", description = "Number of items per page", example = "10")
    @Parameter(name = "sort", description = "Sorting criteria (format: property,asc|desc)", example = "createdAt,desc")
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
    @Operation(method = "GET", summary = "Get notification by ID", description = "Retrieve a specific notification by its ID")
    @ApiResponse(responseCode = "200", description = "Notification found",
            content = @Content(schema = @Schema(implementation = Notification.class)))
    @ApiResponse(responseCode = "404", description = "Notification not found")
    @Parameter(name = "id", description = "ID of the notification", example = "1", required = true)
    public Notification getNotificationById(@PathVariable Long id) {
        return notificationService.findNotificationById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
    }

    @GetMapping("/user/{id}")
    @Operation(method = "GET", summary = "Get user notifications", description = "Retrieve paginated notifications for a specific user")
    @ApiResponse(responseCode = "200", description = "User notifications retrieved successfully",
            content = @Content(schema = @Schema(implementation = Page.class)))
    @ApiResponse(responseCode = "404", description = "User not found")
    @Parameter(name = "id", description = "User ID", example = "1", required = true)
    @Parameter(name = "page", description = "Page number (0-based)", example = "0")
    @Parameter(name = "size", description = "Number of items per page", example = "10")
    @Parameter(name = "sort", description = "Sorting criteria (format: property,asc|desc)", example = "createdAt,desc")
    public Page<Notification> getNotificationsByUserId(@PathVariable Long id, Pageable pageable) {
        return notificationService.getNotificationsByUserId(id, pageable);

    }

    @PatchMapping("/{id}/is-viewed")
    @Operation(method = "PATCH", summary = "Update notification viewed status", description = "Mark a notification as viewed or unviewed")
    @ApiResponse(responseCode = "200", description = "Notification status updated successfully")
    @ApiResponse(responseCode = "404", description = "Notification not found")
    @Parameter(name = "id", description = "Notification ID", example = "1", required = true)
    @Parameter(name = "isViewed", description = "New viewed status", example = "true", required = true)
    public void updateNotificationStatus(
            @PathVariable Long id,
            @RequestParam boolean isViewed) {
        notificationService.updateNotificationStatus(id, isViewed);
    }

    @DeleteMapping("/{id}")
    @Operation(method = "DELETE", summary = "Disable notification", description = "Disable (soft delete) a notification")
    @ApiResponse(responseCode = "200", description = "Notification disabled successfully")
    @ApiResponse(responseCode = "404", description = "Notification not found")
    @Parameter(name = "id", description = "Notification ID", example = "1", required = true)
    public void disableNotification(@PathVariable Long id) {
        notificationService.disableNotification(id);
    }

}
