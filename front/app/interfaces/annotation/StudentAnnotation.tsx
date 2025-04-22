import Annotation from "./annotation/Annotation";
import Student from "./Student";

export default interface StudentAnnotation extends Annotation {
    student: Student
};