
import { TableRowContent } from "./TableRowContent";
import FeedbackStudent from "@/interfaces/feedback/FeedbackStudent";
import FeedbackClass from "@/interfaces/feedback/FeedbackClass";
import FeedbackUser from "@/interfaces/feedback/FeedbackUser";

export default interface TableFeedbackRow extends FeedbackStudent, TableRowContent, FeedbackClass{}