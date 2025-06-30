interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onSearch: (query: string) => void;
}

export default function SearchBar({ placeholder, value = '', onSearch }: SearchBarProps) {
    return (
        <input
            type="text"
            className="search-input"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onSearch(e.target.value)}
            autoComplete="off"
        />
    );
}