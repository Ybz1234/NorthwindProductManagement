import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import "./ActionsTable.css";

export default observer(function ActionsTable() {
    const actions = [
        { name: "Customer orders", url: "/products/list" },
        { name: "Products table", url: "/products/table" },
        { name: "Create New Product", url: "/products/create" }
    ];

    return (
        <div className="actions-table-container">
            <table className="actions-table">
                <thead>
                    <tr>
                        <th>Action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {actions.map((action, index) => (
                        <tr key={index}>
                            <td>{action.name}</td>
                            <td>
                                <Link className="go-button" to={action.url}>Go</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});