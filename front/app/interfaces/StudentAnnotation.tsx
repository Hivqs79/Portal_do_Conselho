import Annotation from "./Annotation";
import Student from "./Student";

export default interface StudentAnnotation extends Annotation {
    student: Student
};