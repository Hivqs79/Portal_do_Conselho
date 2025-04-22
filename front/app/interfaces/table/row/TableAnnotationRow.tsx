import ClassAnnotation from "@/interfaces/annotation/ClassAnnotation";
import { TableRowContent } from "./TableRowContent";
import StudentAnnotation from "@/interfaces/annotation/StudentAnnotation";
import Annotation from "@/interfaces/annotation/Annotation";

export default interface TableAnnotationRow extends TableRowContent, ClassAnnotation, StudentAnnotation, Annotation {}