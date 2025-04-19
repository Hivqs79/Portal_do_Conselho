package net.weg.general_api.model.dto.response;

import net.weg.general_api.model.enums.RoleENUM;

public record LoginResponseDTO(String token, Long userId, RoleENUM role, String  name) {
}
