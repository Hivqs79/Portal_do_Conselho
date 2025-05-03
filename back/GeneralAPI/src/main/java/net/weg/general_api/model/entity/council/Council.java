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

package net.weg.general_api.model.entity.council;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.annotation.Annotation;
import net.weg.general_api.model.entity.feedback.Feedback;
import net.weg.general_api.model.entity.feedback.FeedbackWithCouncil;
import net.weg.general_api.model.entity.preCouncil.PreCouncil;
import net.weg.general_api.model.entity.users.Teacher;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Entity
@Table(name = "council")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Council {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime startDateTime;

    @ManyToOne(fetch = FetchType.EAGER)
    private Class aClass;

    @Column(nullable = false)
    private boolean enabled;

    @Column(nullable = false)
    private boolean isHappening;

    @Column(nullable = false)
    private boolean isFinished;

    @OneToMany(mappedBy = "council")
    private List<Annotation> annotations;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "council_teacher",
            joinColumns = @JoinColumn(name = "council_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id")
    )
    private List<Teacher> teachers;

    @OneToMany(mappedBy = "council")
    private List<FeedbackWithCouncil> feedbacks;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    @PrePersist
    public void onPrePersist() {
        this.setCreateDate(LocalDateTime.now());
        this.setUpdateDate(LocalDateTime.now());
        this.setHappening(false);
        this.setEnabled(true);
        this.setFinished(false);
    }

    @PreUpdate
    public void onPreUpdate() {
        this.setUpdateDate(LocalDateTime.now());
    }

    @Override
    public String toString() {
        return "Council{" +
                "id=" + id +
                ", aClass=" + aClass +
                ", startDateTime=" + startDateTime +
                ", teachers=" + teachers +
                ", isHappening=" + isHappening +
                '}';
    }
}
