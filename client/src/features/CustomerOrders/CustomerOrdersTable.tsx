import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useCustomerOrderCounts } from "../../app/query/queryClient";
import TopCustomersSummary from "./TopCustomersSummary";
import PaginationControls from "../components/PaginationControls";
import "./CustomerOrdersTable.css";
import { Table, type Column } from "../components/Table";

type Customer = { customerName: string; orderCount: number };

export default observer(function CustomerOrdersTable() {
    const { data, isLoading, isError, error } = useCustomerOrderCounts();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    if (isLoading) return <p className="loading">Loading...</p>;
    if (isError) return <p className="error">Error: {(error as Error).message}</p>;

    const sortedCustomers = [...(data || [])].sort((a, b) => b.orderCount - a.orderCount);
    const topThree = sortedCustomers.slice(0, 3);

    const startIndex = (currentPage - 1) * pageSize;
    const pagedCustomers = sortedCustomers.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(sortedCustomers.length / pageSize);

    const columns: Column<Customer>[] = [
        {
            header: "Customer",
            accessor: "customerName",
            width: "70%",
            align: "left",
        },
        {
            header: "Order Count",
            accessor: "orderCount",
            width: "30%",
            align: "right",
        },
    ];

    return (
        <div className="container">
            <TopCustomersSummary customers={topThree} />

            <div className="table-container">
                <Table
                    columns={columns}
                    data={pagedCustomers}
                    rowKey={(row) => row.customerName}
                    containerClassName=""
                    tableClassName=""
                />

                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevious={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                />
            </div>
        </div>
    );
});