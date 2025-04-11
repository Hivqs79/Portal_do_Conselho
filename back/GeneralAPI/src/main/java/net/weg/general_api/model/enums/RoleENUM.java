package net.weg.general_api.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum RoleENUM {
    STUDENT("student"),
    TEACHER("teacher"),
    PEDAGOGIC("pedagogic"),
    ADMIN("admin");

    private final String value;
}
