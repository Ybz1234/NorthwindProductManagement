import { useNavigate, useParams } from "react-router-dom";
import EditProductForm from "../Products/EditProductForm";

export default function EditProductPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    if (!id) return <p>Product ID is missing</p>;

    const productId = parseInt(id, 10);
    if (isNaN(productId)) return <p>Invalid product ID</p>;

    return (
        <EditProductForm
            productId={productId}
            onClose={() => navigate("/products/table")}
        />
    );
}