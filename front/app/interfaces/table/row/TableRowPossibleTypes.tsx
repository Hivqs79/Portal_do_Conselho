import TableAnnotationRow from "./TableAnnotationRow";
import TableCouncilRow from "./TableCouncilRow";
import TableNotificationRow from "./TableNotificationRow";
import TableFeedbackRow from "./TableFeedbackRow";
import TablePreCouncilRow from "./TablePreCouncilRow";
import TablePreCouncilSectionRow from "./TablePreCouncilSectionRow";
import TableFeedbackUserRow from "./TableFeedbackUserRow";

export type TableRowPossibleTypes = 
    TableCouncilRow | 
    TableFeedbackRow |
    TableFeedbackUserRow |
    TableAnnotationRow | 
    TableNotificationRow | 
    TablePreCouncilRow |
    TablePreCouncilSectionRow;
