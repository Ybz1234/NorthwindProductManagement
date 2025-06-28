import { observer } from "mobx-react-lite"
import CreateProductForm from "../Products/CreateProductForm"

export default observer(function CreateProductPage() {
    return (
        <div>
            <CreateProductForm />
        </div>
    )
})