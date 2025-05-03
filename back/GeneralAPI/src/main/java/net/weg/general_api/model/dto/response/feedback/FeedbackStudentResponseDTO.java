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

package net.weg.general_api.model.dto.response.feedback;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.dto.response.council.CouncilResponseDTO;
import net.weg.general_api.model.dto.response.users.StudentResponseDTO;
import net.weg.general_api.model.enums.RankENUM;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackStudentResponseDTO {
    private Long id;
    private RankENUM rank;
    private CouncilResponseDTO council;
    private String strengths;
    private String toImprove;
    private StudentResponseDTO student;
    private double frequency;
    private boolean isViewed;
    private boolean isSatisfied;
    private boolean isReturned;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private boolean enabled;
}
