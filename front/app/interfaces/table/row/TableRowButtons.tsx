/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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