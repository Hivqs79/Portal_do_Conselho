package net.weg.userapi.model.entity.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.entity.Class;
import net.weg.userapi.model.entity.council.Council;

import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "user_id")
public class Teacher extends User {

    @ManyToMany
    @JoinTable(
            name = "teacher_class",
            joinColumns = @JoinColumn(name = "teacher_id"),
            inverseJoinColumns= @JoinColumn(name = "class_id")
    )
    private List<Class> classes;

    @ManyToMany(mappedBy = "teachers")
    private List<Council> councils;



}
