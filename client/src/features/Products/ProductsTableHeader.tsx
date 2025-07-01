import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import agent from "../../app/api/agent";

interface Props {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export default function ProductsTableHeader({ searchQuery, onSearch }: Props) {
  const exportCsv = async (): Promise<void> => {
    try {
      const response = await agent.Products.exportCsv();
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "products.csv";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export CSV failed:", error);
      alert("Failed to export CSV");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
      <SearchBar
        placeholder="Search by product name or category..."
        value={searchQuery}
        onSearch={onSearch}
      />
      <button onClick={exportCsv} className="export-btn">
        Export CSV
      </button>
      <Link to="/products/create" className="create-btn">
        Create New Product
      </Link>
    </div>
  );
}