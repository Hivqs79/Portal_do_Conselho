package net.weg.general_api.model.entity.annotation;


import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name = "annotation_id")
public class AnnotationClass extends Annotation {

    @Override
    public String toString() {
        return super.toString() + "\nAnnotationClass{}";
    }
}
