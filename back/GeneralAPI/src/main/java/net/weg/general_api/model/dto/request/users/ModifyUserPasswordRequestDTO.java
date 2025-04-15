package net.weg.general_api.model.dto.request.users;

public record ModifyUserPasswordRequestDTO (String oldPassword, String newPassword) {
}
