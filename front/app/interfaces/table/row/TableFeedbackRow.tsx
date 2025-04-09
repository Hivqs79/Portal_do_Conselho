
import Feedback from "@/interfaces/Feedback";
import { TableRowContent } from "./TableRowContent";
import FeedbackStudent from "@/interfaces/FeedbackStudent";
import FeedbackClass from "@/interfaces/FeedbackClass";

export default interface TableFeedbackRow extends FeedbackStudent, Feedback, TableRowContent, FeedbackClass{}