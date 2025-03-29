package net.weg.userapi.model.entity.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.entity.classes.Class;
import net.weg.userapi.model.entity.feedback.FeedbackStudent;
import net.weg.userapi.model.enums.RankENUM;

import java.util.List;
import java.util.Objects;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@PrimaryKeyJoinColumn(name = "user_id")
public class Student extends User {

    @Column(nullable = false)
    private Boolean isRepresentant;
    private RankENUM lastRank;

    @ManyToMany
    @JoinTable(
            name = "student_class",
            joinColumns = @JoinColumn(name = "student_id", nullable = false),
            inverseJoinColumns= @JoinColumn(name = "class_id", nullable = false)
    )
    private List<Class> classes;

    @OneToMany(mappedBy = "student")
    private List<FeedbackStudent> feedbackStudent;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(getId(), student.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return super.toString() + "\nStudent{" +
                "isRepresentant=" + isRepresentant +
                '}';
    }
}
