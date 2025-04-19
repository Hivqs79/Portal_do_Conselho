import TableAnnotationRow from "./TableAnnotationRow";
import TableCouncilRow from "./TableCouncilRow";
import TableNotificationRow from "./TableNotificationRow";
import TableFeedbackRow from "./TableFeedbackRow";
import TablePreCouncilRow from "./TablePreCouncilRow";
import TablePreCouncilSectionRowProps from "./TablePreCouncilSectionRow";

export type TableRowPossibleTypes = 
    TableCouncilRow | 
    TableFeedbackRow | 
    TableAnnotationRow | 
    TableNotificationRow | 
    TablePreCouncilRow |
    TablePreCouncilSectionRowProps;
