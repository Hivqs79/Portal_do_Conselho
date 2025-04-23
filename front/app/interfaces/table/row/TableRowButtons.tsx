import { TableRowPossibleTypes } from "./TableRowPossibleTypes";
import { Rank } from "@/interfaces/RankType";

export interface TableRowButtons {
    rankButton?: boolean;
    rankVisualizer?: boolean;
    realizeButton?: boolean;
    inicializeButton?: boolean;
    visualizeIconButton?: boolean;
    visualizeButton?: boolean;
    editButton?: boolean;
    deleteButton?: boolean;
    seeButton?: boolean;
    annotationButton?: boolean;
    closeButton?: boolean;
    releasedButton?: boolean;
    releaseButton?: boolean;
    preCouncilButton?: boolean;
    onClickEdit?: (row: TableRowPossibleTypes) => void;
    onClickDelete?: (row: TableRowPossibleTypes) => void;
    onClickRealize?: (row: TableRowPossibleTypes) => void;
    onClickInicialize?: (row: TableRowPossibleTypes) => void;
    onClickVisualize?: (row: TableRowPossibleTypes) => void;
    onClickRelease?: (row: TableRowPossibleTypes) => void;
    onClickAnnotation?: (row: TableRowPossibleTypes) => void;
    setRank?: (rank: Rank, id: number) => void;
    setPositiveContent?: (content: string, id: number) => void;
    setNegativeContent?: (content: string, id: number) => void;
}