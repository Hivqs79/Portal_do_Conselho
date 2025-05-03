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

package api.chat.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.*;

/**
 * @author Vinícius Eduardo dos Santos
 * @author Pedro Henrique Panstein
 */

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String content;
    private LocalDateTime currentTimeDate;
    private Long senderId;
    @ManyToOne
    @JoinColumn(name = "room_conversation_id")
    private RoomConversation roomConversation;

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", currentTimeDate=" + currentTimeDate +
                ", senderId=" + senderId +
                ", roomConversation=" + roomConversation +
                '}';
    }
}
