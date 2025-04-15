
import { TableRowContent } from "./TableRowContent";
import FeedbackStudent from "@/interfaces/FeedbackStudent";
import FeedbackClass from "@/interfaces/FeedbackClass";

export default interface TableFeedbackRow extends FeedbackStudent, TableRowContent, FeedbackClass{}