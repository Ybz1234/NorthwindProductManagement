import type { IProduct } from "../../app/models/product";

interface Props {
    product: IProduct;
    isDeleting: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteProductModal({ product, isDeleting, onConfirm, onCancel }: Props) {
    return (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal">
                <h3 id="modal-title">Confirm Deletion</h3>
                <p>
                    Are you sure you want to delete <strong>{product.productName}</strong>?
                </p>
                {product.hasOrders && (
                    <p style={{ color: "red", fontWeight: "bold" }}>
                        This product is part of one or more existing orders and deleting it may cause data inconsistencies.
                    </p>
                )}
                <div className="modal-buttons">
                    <button className="btn btn-delete" disabled={isDeleting} onClick={onConfirm}>
                        {isDeleting ? "Deleting..." : "Yes, Delete"}
                    </button>
                    <button className="btn btn-cancel" disabled={isDeleting} onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
