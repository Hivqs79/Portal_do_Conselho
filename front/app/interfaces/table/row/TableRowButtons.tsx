import { TableRowPossibleTypes } from "./TableRowPossibleTypes";

export interface TableRowButtons {
    rank?: boolean;
    realizeButton?: boolean;
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