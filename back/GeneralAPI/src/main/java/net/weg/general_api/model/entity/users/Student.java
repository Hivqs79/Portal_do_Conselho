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

package net.weg.general_api.model.entity.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.entity.classes.Class;
import net.weg.general_api.model.entity.feedback.FeedbackStudent;
import net.weg.general_api.model.enums.RankENUM;

import java.util.List;
import java.util.Objects;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "user_id")
public class Student extends User {

    @Column(nullable = false)
    private Boolean isRepresentant;
    private RankENUM lastRank;
    private Double lastFrequency = 0.0;

    @ManyToMany
    @JoinTable(
            name = "student_class",
            joinColumns = @JoinColumn(name = "student_id", nullable = false),
            inverseJoinColumns= @JoinColumn(name = "class_id", nullable = false)
    )
    private List<Class> classes;

    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER)
    private List<FeedbackStudent> feedbackStudent;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(getId(), student.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Student{" +
                "isRepresentant=" + isRepresentant +
                ", lastRank=" + lastRank +
                ", lastFrequency=" + lastFrequency +
                ", feedbackStudent=" + feedbackStudent +
                '}';
    }
}
