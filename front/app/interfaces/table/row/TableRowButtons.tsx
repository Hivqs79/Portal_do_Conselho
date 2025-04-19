import { TableRowPossibleTypes } from "./TableRowPossibleTypes";
import { Rank } from "@/interfaces/RankType";

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
    setRank?: (rank: Rank, id: number) => void;
    setPositiveContent?: (content: string, id: number) => void;
    setNegativeContent?: (content: string, id: number) => void;
}