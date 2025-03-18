package net.weg.userapi.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.entity.users.Student;
import net.weg.userapi.model.entity.users.Teacher;
import net.weg.userapi.model.enums.ClassAreaENUM;

import java.util.List;

@Builder
@Entity
@Data
@Table(name = "class")
@AllArgsConstructor
@NoArgsConstructor
public class Class {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ClassAreaENUM area;

    @Column(nullable = false)
    private String course;

    @ManyToMany(mappedBy = "classes")
    private List<Teacher> teachers;

    @ManyToMany(mappedBy = "classes")
    private List<Student> students;

}
