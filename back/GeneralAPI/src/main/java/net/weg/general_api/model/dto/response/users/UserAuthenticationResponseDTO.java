package net.weg.general_api.model.dto.response.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.general_api.model.enums.RoleENUM;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAuthenticationResponseDTO {
    private Long id;
    private String username;
    private Boolean accountNonExpired;
    private Boolean accountNonLocked;
    private Boolean credentialsNonExpired;
    private Boolean enabled;
    private RoleENUM role;
}
