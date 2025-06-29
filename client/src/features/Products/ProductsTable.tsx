import { observer } from "mobx-react-lite";
import { useState, useEffect, useCallback } from "react";
import { useProducts } from "../../app/hooks/useProducts";
import PaginationControls from "../components/PaginationControls";
import SearchBar from "../components/SearchBar";
import "./ProductsTable.css";
import { Table, type Column } from "../components/Table";
import type { IProduct } from "../../app/models/product";
import EditProductForm from "./EditProductForm";
import { useNavigate } from "react-router-dom";
import agent from "../../app/api/agent";
import { toast } from "react-toastify";

export default observer(function ProductsTable() {
  const { data, isLoading, isError, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();
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

  const handleDeleteConfirm = useCallback(async () => {
  if (!productToDelete) return;
  setIsDeleting(true);
  try {
    await agent.Products.delete(productToDelete.productID);
    toast.success(`Deleted product: ${productToDelete.productName}`);
    setProductToDelete(null);
    window.location.reload(); // or better: refetch products list
  } catch (error: any) {
    const backendMsg = error?.response?.data?.message;

    if (
      backendMsg?.toLowerCase().includes("referenced by existing orders") ||
      backendMsg?.toLowerCase().includes("cannot delete product")
    ) {
      toast.error(
        "Cannot delete product because it is referenced by existing orders."
      );
    } else if (error.response?.status === 500) {
      toast.error("Server error. Please try again later.");
    } else {
      toast.error(
        backendMsg || "Failed to delete product. Please try again."
      );
    }

    console.error(error);
  } finally {
    setIsDeleting(false);
  }
}, [productToDelete]);


  // Close modal on Escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !isDeleting) setProductToDelete(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDeleting]);

  if (isLoading) return <p className="loading">Loading products...</p>;
  if (isError) return <p className="error">Error: {(error as Error).message}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const pagedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const columns: Column<IProduct>[] = [
    { header: "Product Name", accessor: "productName", width: "25%", align: "left" },
    { header: "Category", accessor: "category", width: "15%", align: "left" },
    { header: "Supplier", accessor: "supplier", width: "15%", align: "left" },
    { header: "Unit Price", accessor: "unitPrice", width: "15%", align: "right" },
    { header: "Units", accessor: "units", width: "15%", align: "right" },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="actions-cell">
          <button className="btn btn-edit" onClick={() => navigate(`/products/edit/${row.productID}`)}>Edit</button>
          <button className="btn btn-delete" onClick={() => setProductToDelete(row)}>Delete</button>
        </div>
      ),
      width: "15%",
      align: "center",
    },
  ];

  return (
    <div className="products-table-container">
      <SearchBar placeholder="Search by product name or category..." onSearch={setSearchQuery} />

      <Table
        columns={columns}
        data={pagedProducts}
        rowKey={(row) => row.productID.toString()}
        containerClassName="table-container"
        tableClassName="products-table"
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      />

      {editingProductId !== null && (
        <EditProductForm productId={editingProductId} onClose={() => setEditingProductId(null)} />
      )}

      {productToDelete && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal">
            <h3 id="modal-title">Confirm Deletion</h3>
            <p>Are you sure you want to delete <strong>{productToDelete.productName}</strong>?</p>
            <div className="modal-buttons">
              <button className="btn btn-delete" disabled={isDeleting} onClick={handleDeleteConfirm}>
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button className="btn btn-cancel" disabled={isDeleting} onClick={() => setProductToDelete(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
