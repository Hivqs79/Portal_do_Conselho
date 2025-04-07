import { TableRowPossibleTypes } from "./TableRowPossibleTypes";

export interface TableRowButtons {
    rankButton?: boolean;
    rankVisualizer?: boolean;
    realizeButton?: boolean;
    onClickRealize?: (row: TableRowPossibleTypes) => void;
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