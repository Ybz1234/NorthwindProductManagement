type Props = {
    customers: { customerName: string; orderCount: number }[];
};

export default function TopCustomersSummary({ customers }: Props) {
    return (
        <div className="summary-box">
            <h2>Top 3 Customers by Order Count</h2>
            <div className="summary-cards">
                {customers.map((customer, index) => (
                    <div key={customer.customerName} className="summary-card">
                        <h3>{customer.customerName}</h3>
                        <p>Orders: {customer.orderCount}</p>
                        <span className="rank">#{index + 1}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}