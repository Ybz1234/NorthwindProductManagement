import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import "./ActionsTable.css";
import { Table, type Column } from "../components/Table";

const actions = [
  { name: "Customer orders", url: "/products/list" },
  { name: "Products table", url: "/products/table" }
];

const columns: Column<typeof actions[0]>[] = [
  {
    header: "Action",
    accessor: "name",
  },
  {
    header: "",
    accessor: (row) => (
      <Link className="go-button" to={row.url}>
        Go
      </Link>
    ),
    width: 80,
    align: "center",
  },
];

export default observer(function ActionsTable() {
  return (
    <Table
      columns={columns}
      data={actions}
      rowKey={(row) => row.name}
      containerClassName="actions-table-container"
      tableClassName="actions-table"
    />
  );
});
