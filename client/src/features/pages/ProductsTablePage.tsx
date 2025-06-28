import { observer } from "mobx-react-lite"
import ProductsTable from "../Products/ProductsTable"

export default observer(function ProductsTablePage() {
    return (
        <>
            <h1>Products table</h1>
            <ProductsTable />
        </>
    )
})