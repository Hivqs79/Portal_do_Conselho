package net.weg.general_api.model.entity.notification;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    @Column(nullable = false, columnDefinition = "TEXT")
    @NotBlank
    private String message;

    @Column(nullable = false)
    private LocalDateTime messageDateTime;

    @Column(nullable = false)
    private boolean enabled;

    private boolean isViewed;

    @PrePersist
    public void onPrePersist() {
        this.setEnabled(true);
        this.setViewed(false);
        this.setMessageDateTime(LocalDateTime.now());
    }


}
