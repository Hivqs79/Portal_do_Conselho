import { TableRowPossibleTypes } from "./TableRowPossibleTypes";

export interface TableRowButtons {
    rankButton?: boolean;
    rankVisualizer?: boolean;
    realizeButton?: boolean;
    visualizeIconButton?: boolean;
    visualizeButton?: boolean;
    editButton?: boolean;
    deleteButton?: boolean;
    seeButton?: boolean;
    annotationButton?: boolean;
    closeButton?: boolean;
    releasedButton?: boolean;
    releaseButton?: boolean;
    onClickRealize?: (row: TableRowPossibleTypes) => void;
    onClickVisualize?: (row: TableRowPossibleTypes) => void;
    onClickRealease?: (row: TableRowPossibleTypes) => void;
    onClickAnnotation?: (row: TableRowPossibleTypes) => void;
}