import { observer } from "mobx-react-lite";
import { useCustomerOrderCounts } from "../../app/query/queryClient";

function CustomerRow({ customer }: { customer: { customerName: string; orderCount: number } }) {
    return (
        <tr>
            <td>{customer.customerName}</td>
            <td>{customer.orderCount}</td>
        </tr>
    );
}

function CustomerRows({ customers }: { customers: { customerName: string; orderCount: number }[] }) {
    return (
        <>
            {customers.map((customer) => (
                <CustomerRow key={customer.customerName} customer={customer} />
            ))}
        </>
    );
}

export default observer(function CustomerOrdersTable() {
    const { data, isLoading, isError, error } = useCustomerOrderCounts();
    console.log("Customer Orders:", data);
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Order Count</th>
                </tr>
            </thead>
            <tbody>
                {data && <CustomerRows customers={data} />}
            </tbody>
        </table>
    );
})