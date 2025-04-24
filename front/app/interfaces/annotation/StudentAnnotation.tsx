import Annotation from "./Annotation";
import Student from "../users/Student";

export default interface StudentAnnotation extends Annotation {
    student: Student
};