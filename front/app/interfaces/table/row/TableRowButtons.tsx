import { TableRowPossibleTypes } from "./TableRowPossibleTypes";

export interface TableRowButtons {
    rankButton?: boolean;
    realizeButton?: boolean;
    onClickRealize?: (row: TableCouncilRow) => void;
    visualizeIconButton?: boolean;
    onClickVisualize?: (row: TableRowPossibleTypes) => void;
    visualizeButton?: boolean;
    editButton?: boolean;
    deleteButton?: boolean;
    seeButton?: boolean;
    annotationButton?: boolean;
    onClickAnnotation?: (row: TableRowPossibleTypes) => void;
    closeButton?: boolean;
    releasedButton?: boolean;
    releaseButton?: boolean;
}