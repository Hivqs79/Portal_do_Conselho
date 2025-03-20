package net.weg.userapi.model.entity.annotation;


import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.weg.userapi.model.entity.Class;

@Entity
@PrimaryKeyJoinColumn(name = "annotation_id")
public class AnnotationClass extends Annotation {


}
