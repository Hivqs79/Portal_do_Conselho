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

package net.weg.general_api.model.entity.feedback;

import jakarta.persistence.*;
import lombok.Data;
import net.weg.general_api.model.entity.council.Council;

import java.time.LocalDateTime;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String strengths;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String toImprove;

    @Column(nullable = false)
    private boolean enabled;

    @Column(nullable = false)
    private boolean isReturned;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    @PreUpdate
    public void onPreUpdate() {
        this.setUpdateDate(LocalDateTime.now());
    }

    @Override
    public String toString() {
        return "Feedback{" +
                "id=" + id +
                ", strengths='" + strengths + '\'' +
                ", toImprove='" + toImprove + '\'' +
                ", isReturned='" + isReturned +
                '}';
    }
}
