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

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.entity.security.PasswordResetToken;
import net.weg.general_api.model.enums.RoleENUM;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Builder
@Entity
@Table(name = "user_authentication_tb")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthentication implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private boolean accountNonExpired;
    @Column(nullable = false)
    private boolean accountNonLocked;
    @Column(nullable = false)
    private boolean credentialsNonExpired;
    @Column(nullable = false)
    private boolean enabled;

    @Column(nullable = false)
    private RoleENUM role;

    @OneToMany(mappedBy = "userAuthentication")
    private List<PasswordResetToken> passwordResetTokens;

    @OneToOne(mappedBy = "userAuthentication")
    @JsonIgnore
    private User user;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.role.equals(RoleENUM.ADMIN)) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_STUDENT"), new SimpleGrantedAuthority("ROLE_TEACHER"), new SimpleGrantedAuthority("ROLE_PEDAGOGIC"), new SimpleGrantedAuthority("ROLE_SUBPEDAGOGIC"), new SimpleGrantedAuthority("ROLE_SUPERVISOR"));
        } else if (this.role.equals(RoleENUM.PEDAGOGIC)) {
            return List.of(new SimpleGrantedAuthority("ROLE_PEDAGOGIC"), new SimpleGrantedAuthority("ROLE_SUBPEDAGOGIC"));
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_" + role));
        }
    }

    @Override
    public String toString() {
        return "UserAuthentication{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", accountNonExpired=" + accountNonExpired +
                ", accountNonLocked=" + accountNonLocked +
                ", credentialsNonExpired=" + credentialsNonExpired +
                ", enabled=" + enabled +
                ", role=" + role +
                '}';
    }
}
