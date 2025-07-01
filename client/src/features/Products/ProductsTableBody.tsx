import { useNavigate } from "react-router-dom";
import { Table, type Column } from "../components/Table";
import type { IProduct } from "../../app/models/product";

interface Props {
    products: IProduct[];
    onDelete: (product: IProduct) => void;
}

export default function ProductsTableBody({ products, onDelete }: Props) {
    const navigate = useNavigate();

    const columns: Column<IProduct>[] = [
        { header: "Product Name", accessor: "productName", width: "25%" },
        { header: "Category", accessor: "category", width: "15%" },
        { header: "Supplier", accessor: "supplier", width: "15%" },
        { header: "Unit Price", accessor: "unitPrice", width: "15%", align: "right" },
        { header: "Units", accessor: "unitsInStock", width: "15%", align: "right" },
        {
            header: "Actions",
            accessor: (row) => (
                <div className="actions-cell">
                    <button className="btn btn-edit" onClick={() => navigate(`/products/edit/${row.productID}`)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => onDelete(row)}>Delete</button>
                </div>
            ),
            width: "15%",
            align: "center",
        },
    ];

    return (
        <Table
            columns={columns}
            data={products}
            rowKey={(row) => row.productID.toString()}
            containerClassName="table-container"
            tableClassName="products-table"
        />
    );
}