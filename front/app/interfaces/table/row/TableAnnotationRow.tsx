import ClassAnnotation from "@/interfaces/ClassAnnotation";
import { TableRowContent } from "./TableRowContent";
import StudentAnnotation from "@/interfaces/StudentAnnotation";

export default interface TableAnnotationRow extends TableRowContent, ClassAnnotation, StudentAnnotation {}