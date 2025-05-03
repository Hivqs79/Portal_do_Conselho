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
import lombok.Data;
import net.weg.general_api.model.entity.feedback.FeedbackUser;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
//InheritanceType.SINGLE_TABLE = 1 table w/ all attributes
//InheritanceType.TABLE_PER_CLASS = 1 table per class
//InheritanceType.JOINED = 1 super table, and 1 table per subclass w/ FK
public abstract class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "update_date", nullable = false)
    private LocalDateTime updateDate;

    @OneToOne(mappedBy = "user")
    private Customization customization;

    @OneToMany(mappedBy = "user")
    private List<FeedbackUser> feedbackUsers;

    @OneToOne
    private UserAuthentication userAuthentication;

    @PrePersist
    public void onPrePersist() {
        this.setCreateDate(LocalDateTime.now());
        this.setUpdateDate(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate() {
        this.setUpdateDate(LocalDateTime.now());
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", userAuth='" + userAuthentication + '\'' +
                '}';
    }
}
