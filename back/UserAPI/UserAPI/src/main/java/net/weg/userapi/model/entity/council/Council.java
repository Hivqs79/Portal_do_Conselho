package net.weg.userapi.model.entity.council;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.entity.Class;
import net.weg.userapi.model.entity.users.Teacher;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Builder
@Entity
@Table(name = "council")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Council {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer council;

    private LocalDate date;
    private LocalTime time;

    @ManyToOne
    private Class aClass;

    @ManyToMany
    @JoinTable(
            name = "council_teacher",
            joinColumns = @JoinColumn(name = "council_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id")
    )
    private List<Teacher> teachers;

}
