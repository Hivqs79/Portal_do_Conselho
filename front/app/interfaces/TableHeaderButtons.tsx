interface TableHeaderButtons {
  searchInput?: boolean;
  setSearch?: (term: string) => void;
  searchValue?: string;
  filterButton?: boolean;
  setFilter?: (filter: boolean) => void;
  orderButton?: boolean;
  setOrder?: (order: boolean) => void;
  onChangeRank?: (rank: string) => void;
}