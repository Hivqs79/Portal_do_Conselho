package net.weg.general_api.model.entity.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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

    private String username;
    private String password;
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;

    private RoleENUM role;

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
