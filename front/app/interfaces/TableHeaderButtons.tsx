interface TableHeaderButtons {
    searchInput?: boolean;
    setSearch?: (term: string) => void;
    filterButton?: boolean;
    setFilter?: (filter: boolean) => void;
    orderButton?: boolean;
    setOrder?: (order: boolean) => void; 
}