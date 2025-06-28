import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { useProducts } from "../../app/hooks/useProducts";
import PaginationControls from "../components/PaginationControls";
import SearchBar from "../components/SearchBar";
import "./ProductsTable.css";
import { Table, type Column } from "../components/Table";

type Product = {
  productName: string;
  category: string;
  supplier: string;
  unitPrice: number;
  units: number;
};

export default observer(function ProductsTable() {
  const { data, isLoading, isError, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const pageSize = 10;

  useEffect(() => {
    if (!data) return;
    const lower = searchQuery.toLowerCase();
    const filtered = data.filter(
      (product) =>
        product.productName.toLowerCase().includes(lower) ||
        product.category.toLowerCase().includes(lower)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, data]);

  if (isLoading) return <p className="loading">Loading products...</p>;
  if (isError) return <p className="error">Error: {(error as Error).message}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const pagedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const columns: Column<Product>[] = [
    { header: "Product Name", accessor: "productName", width: "30%", align: "left" },
    { header: "Category", accessor: "category", width: "20%", align: "left" },
    { header: "Supplier", accessor: "supplier", width: "20%", align: "left" },
    { header: "Unit Price", accessor: "unitPrice", width: "15%", align: "right" },
    { header: "Units", accessor: "units", width: "15%", align: "right" },
  ];

  return (
    <div className="products-table-container">
      <SearchBar
        placeholder="Search by product name or category..."
        onSearch={setSearchQuery}
      />

      <Table
        columns={columns}
        data={pagedProducts}
        rowKey={(row) => row.productName}
        containerClassName="table-container"
        tableClassName="products-table"
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      />
    </div>
  );
});