package net.weg.general_api.model.entity.annotation;


import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.*;
import net.weg.general_api.model.entity.council.Council;
import net.weg.general_api.model.entity.users.Student;
import net.weg.general_api.model.entity.users.Teacher;
import net.weg.general_api.model.enums.RankENUM;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "annotation_id")
public class AnnotationStudent extends Annotation {

    @ManyToOne
    private Student student;

    public AnnotationStudent(RankENUM rank, String strengths, String toImprove, Council council, Teacher teacher, Student student) {
        super(rank, strengths, toImprove, council, teacher);
        this.student = student;
    }

    @Override
    public String toString() {
        return super.toString() + "\nAnnotationStudent{" +
                "student=" + (student != null ? student : "null") +
                '}';
    }
}
