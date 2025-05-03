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

package net.weg.general_api.model.entity.annotation;


import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.*;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.model.enums.RankENUM;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "annotation_id")
public class AnnotationStudent extends Annotation {

    @ManyToOne
    private Student student;

    public AnnotationStudent(RankENUM rank, String strengths, String toImprove, Council council, Teacher teacher, Student student) {
        super(rank, strengths, toImprove, council, teacher);
        this.student = student;
    }

    @Override
    public String toString() {
        return super.toString() + "\nAnnotationStudent{" +
                "student=" + (student != null ? student : "null") +
                '}';
    }
}
