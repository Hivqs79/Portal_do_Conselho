package net.weg.general_api.model.dto.response;

import jakarta.validation.constraints.NotBlank;

public record ModifyUserRoleRequestDTO(
        @NotBlank String newRole
) {
}
