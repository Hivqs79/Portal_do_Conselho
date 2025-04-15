package net.weg.general_api.model.dto.request.users;

public record ModifyUserPasswordRequestDTO (String email, String oldPassword, String newPassword) {
}
