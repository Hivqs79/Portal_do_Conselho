import TableCouncilRow from "./TableCouncilRow";

export interface TableRowButtons {
    rank?: boolean;
    realizeButton?: boolean;
    onClickRealize?: (row: TableCouncilRow) => void;
    visualizeIconButton?: boolean;
    onClickVisualize?: (row: TableCouncilRow) => void;
    visualizeButton?: boolean;
    editButton?: boolean;
    deleteButton?: boolean;
    seeButton?: boolean;
    anotationButton?: boolean;
    closeButton?: boolean;
    releasedButton?: boolean;
    releaseButton?: boolean;
}