/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package net.weg.general_api.service.notification;

import lombok.AllArgsConstructor;
import net.weg.general_api.exception.exceptions.NotificationNotFoundException;
import net.weg.general_api.model.entity.notification.Notification;
import net.weg.general_api.repository.NotificationRepository;
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


    public Page<Notification> getNotificationsByUserId(Long id, Pageable pageable) {
        return notificationRepository.getNotificationsByUserId(id, pageable);
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public Optional<Notification> findNotificationById(Long id) {
        return notificationRepository.findById(id);
    }

    public void updateNotificationStatus(Long id, boolean isViewed) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new NotificationNotFoundException("Notification not found"));
        notification.setViewed(isViewed);
        notificationRepository.save(notification);
    }

    public void disableNotification(Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new NotificationNotFoundException("Notification not found"));
        notification.setEnabled(false);
        notificationRepository.save(notification);
    }
}