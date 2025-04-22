import Feedback from "./Feedback";
import Student from "@/interfaces/users/Student";

export default interface FeedbackStudent extends Feedback {
  student: Student;
  frequency: number;
  satisfied: boolean;
}
