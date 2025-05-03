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

import { useState, useEffect } from "react";

interface NotificationMessage {
  userId: number;
  title: string;
  message: string;
  creationTime: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Obter userId do localStorage
    const userId = localStorage.getItem("idUser");

    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    const eventSource = new EventSource(
      `/api/notifications/stream?userId=${userId}`
    );

    eventSource.onopen = () => {
      setIsConnected(true);
      console.log("Notification stream connected");
    };

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data) as NotificationMessage;

      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    eventSource.onerror = () => {
      setIsConnected(false);
      console.error("Notification stream error");
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const markAsRead = () => {
    setUnreadCount(0);
  };

  return { notifications, unreadCount, isConnected, markAsRead };
}