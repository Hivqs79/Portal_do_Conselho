package net.weg.general_api.model.dto.request;

public record ResetPasswordRequestDTO(String email, String code, String newPassword) {
}
