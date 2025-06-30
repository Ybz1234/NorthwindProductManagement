import SearchBar from "../components/SearchBar";

interface Props {
    searchQuery: string;
    onSearch: (query: string) => void;
}

export default function ProductsTableHeader({ searchQuery, onSearch }: Props) {
    return (
        <SearchBar
            placeholder="Search by product name or category..."
            value={searchQuery}
            onSearch={onSearch}
        />
    );
}