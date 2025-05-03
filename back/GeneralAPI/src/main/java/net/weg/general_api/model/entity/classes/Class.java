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

package net.weg.general_api.model.entity.classes;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.model.enums.ClassAreaENUM;
import net.weg.general_api.model.enums.RankENUM;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Entity
@Data
@Table(name = "class")
@AllArgsConstructor
@NoArgsConstructor
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClassAreaENUM area;

    @Column(nullable = false)
    private String course;

    private RankENUM lastRank;

    @Column(nullable = false)
    private boolean enabled;

    @ManyToMany(mappedBy = "classes", fetch = FetchType.EAGER)
    private List<Teacher> teachers;

    @ManyToMany(mappedBy = "classes", fetch = FetchType.EAGER)
    private List<Student> students;

    @OneToMany(mappedBy = "aClass")
    private List<Council> councils;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    @PrePersist
    public void onPrePersist() {
        this.setEnabled(true);
        this.setCreateDate(LocalDateTime.now());
        this.setUpdateDate(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        this.setUpdateDate(LocalDateTime.now());
    }

    @Override
    public String toString() {
        return "Class{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", area=" + area.toString() +
                ", course='" + course + '\'' +
                '}';
    }
}
