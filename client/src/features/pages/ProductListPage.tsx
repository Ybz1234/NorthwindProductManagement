import { observer } from "mobx-react-lite"
import CustomerOrdersTable from "../CustomerOrders/CustomerOrdersTable"

export default observer(function ProductListPage() {
    return (
        <>
            <h1>Customer orders</h1>
            <CustomerOrdersTable />
        </>
    )
})