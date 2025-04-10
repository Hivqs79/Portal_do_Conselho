import { Rank } from "@/interfaces/RankType";

export interface TableHeaderButtons {
  searchInput?: boolean;
  setSearch?: (term: string) => void;
  searchValue?: string;
  filterButton?: boolean;
  setFilter?: (filter: boolean) => void;
  orderButton?: boolean;
  setOrder?: (order: boolean) => void;
  rank?: Rank;
  setRank?: (rank: Rank) => void;
  rankText?: string;
  rankVisualizer?: boolean;
}