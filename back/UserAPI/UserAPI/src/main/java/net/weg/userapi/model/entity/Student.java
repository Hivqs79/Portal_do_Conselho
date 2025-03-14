package net.weg.userapi.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "user_id")
public class Student extends User {

    @Column(nullable = false)
    private Boolean isRepresentant;

    @ManyToMany
    @JoinTable(
            name = "student_class",
            joinColumns = @JoinColumn(name = "student_id", nullable = false),
            inverseJoinColumns= @JoinColumn(name = "class_id", nullable = false)
    )
    private List<Class> classes;

}
