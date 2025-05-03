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
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.enums.*;

@Builder
@Entity
@Table(name = "customization")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "mode_theme")
    private ModeThemeENUM modeTheme;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PalleteENUM pallete;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TextFont textFont;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TitleFont titleFont;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FontSizeENUM fontSize;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Override
    public String toString() {
        return "Customization{" +
                "id=" + id +
                ", modeTheme=" + modeTheme +
                ", pallete=" + pallete +
                ", textFont=" + textFont +
                ", titleFont=" + titleFont +
                ", fontSize=" + fontSize +
                ", user=" + user.getName() +
                '}';
    }
}
