import Feedback from "./Feedback";
import Student from "./Student";

export default interface FeedbackStudent extends Feedback {
  id: number;
  student: Student;
  frequency: number;
  satisfied: boolean;
}
