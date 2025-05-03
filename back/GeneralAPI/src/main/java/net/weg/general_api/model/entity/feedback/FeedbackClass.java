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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.enums.RankENUM;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "feedback_id")
public class FeedbackClass extends FeedbackWithCouncil {

    @Enumerated(EnumType.STRING)
    @Column(name = "rank_classification", nullable = false)
    private RankENUM rank;

    @PrePersist
    public void onPrePersist() {
        this.setCreateDate(LocalDateTime.now());
        this.setUpdateDate(LocalDateTime.now());
        this.setReturned(false);
        this.setEnabled(true);
    }

    @Override
    public String toString() {
        return "FeedbackClass{" +
                "rank=" + rank +
                ", council=" + super.getCouncil().getId() +
                ", class=" + getCouncil().getAClass().getName() +
                '}';
    }
}
