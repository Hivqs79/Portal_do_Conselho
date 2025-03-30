package net.weg.general_api.model.entity.users;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name = "user_id")
public class Admin extends User {
    @Override
    public String toString() {
        return super.toString();
    }
}
