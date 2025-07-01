import { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";
import ProductsTableHeader from "./ProductsTableHeader";
import ProductsTableBody from "./ProductsTableBody";
import PaginationControls from "../components/PaginationControls";
import DeleteProductModal from "./DeleteProductModal";
import "./ProductsTable.css";
import type { IProduct } from "../../app/models/product";
import { useProducts } from "../../app/hooks/useProducts";

export default observer(function ProductsTable() {
  const { data, isLoading, isError, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const pageSize = 8;

  useEffect(() => {
    if (!data) return;
    const lower = searchQuery.toLowerCase();
    const filtered = data.filter(
      (p) =>
        p.productName.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, data]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      await agent.Products.delete(productToDelete.productID);
      toast.success(`Deleted product: ${productToDelete.productName}`);
      setProductToDelete(null);
      window.location.reload();
    } catch (error: any) {
      const backendMsg = error?.response?.data?.message;
      if (backendMsg?.toLowerCase().includes("referenced by existing orders")) {
        toast.error("Cannot delete product because it is referenced by existing orders.");
      } else {
        toast.error(backendMsg || "Failed to delete product.");
      }
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }, [productToDelete]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !isDeleting) setProductToDelete(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDeleting]);

  if (isLoading) return <p className="loading">Loading...</p>;
  if (isError) return <p className="error">Error: {error.message}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const paged = filteredProducts.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  return (
    <div className="products-table-container">
      <div style={{ marginBottom: "1rem" }}>
        <ProductsTableHeader searchQuery={searchQuery} onSearch={setSearchQuery} />
      </div>
      <ProductsTableBody products={paged} onDelete={setProductToDelete} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      />
      {productToDelete && (
        <DeleteProductModal
          product={productToDelete}
          isDeleting={isDeleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setProductToDelete(null)}
        />
      )}
    </div>
  );
});