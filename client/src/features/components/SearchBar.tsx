import { useState } from "react";

type Props = {
    placeholder?: string;
    onSearch: (query: string) => void;
};

export default function SearchBar({ placeholder = "Search...", onSearch }: Props) {
    const [query, setQuery] = useState("");

    const handleChange = (value: string) => {
        setQuery(value);
        onSearch(value);
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <input
                type="text"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={placeholder}
                className="search-input"
            />
        </div>
    );
}