package net.weg.userapi.model.entity.users;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name = "user_id")
public class Pedagogic extends User {

    @Override
    public String toString() {
        return super.toString();
    }

}
