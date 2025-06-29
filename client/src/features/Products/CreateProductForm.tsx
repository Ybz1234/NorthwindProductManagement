import * as Yup from "yup";
import { useState } from "react";
import { useCreateProduct } from "../../app/hooks/useCreateProduct";
import { useCategories } from "../../app/hooks/useCategories";
import { useSuppliers } from "../../app/hooks/useSuppliers";
import GenericForm from "../components/GenericForm";
import type { Option, FieldConfig } from "../components/GenericForm";

export default function CreateProductForm() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const { mutateAsync, isPending } = useCreateProduct();
    const { data: categories = [], isLoading: loadingCategories } = useCategories();
    const { data: suppliers = [], isLoading: loadingSuppliers } = useSuppliers();

    const categoryOptions: Option[] = categories.map((c) => ({
        text: c.categoryName,
        value: c.categoryId.toString(),
    }));

    const supplierOptions: Option[] = suppliers.map((s) => ({
        text: s.companyName,
        value: s.supplierId.toString(),
    }));

    const initialValues = {
        productName: "",
        supplierId: "",
        categoryId: "",
        quantityPerUnit: "",
        unitPrice: "",
        unitsInStock: "",
    };

    const validationSchema = Yup.object({
        productName: Yup.string().required("Required"),
        supplierId: Yup.string().required("Required"),
        categoryId: Yup.string().required("Required"),
        quantityPerUnit: Yup.string().required("Required"),
        unitPrice: Yup.number().required("Required").positive("Must be positive"),
        unitsInStock: Yup.number().required("Required").min(0, "Cannot be negative"),
    });

    const fields: FieldConfig[] = [
        { name: "productName", label: "Product Name", placeholder: "Enter name" },
        {
            name: "supplierId",
            label: "Supplier",
            type: "select",
            placeholder: loadingSuppliers ? "Loading suppliers..." : "Select supplier",
            options: supplierOptions,
        },
        {
            name: "categoryId",
            label: "Category",
            type: "select",
            placeholder: loadingCategories ? "Loading categories..." : "Select category",
            options: categoryOptions,
        },
        { name: "quantityPerUnit", label: "Quantity Per Unit", placeholder: "e.g. 6 bottles" },
        { name: "unitPrice", label: "Unit Price", type: "number", placeholder: "e.g. 12.5" },
        { name: "unitsInStock", label: "Units in Stock", type: "number", placeholder: "e.g. 100" },
    ];

    const onSubmit = async (values: typeof initialValues, { setSubmitting, resetForm }: any) => {
        setError("");
        try {
            await mutateAsync({
                productName: values.productName,
                supplierId: parseInt(values.supplierId),
                categoryId: parseInt(values.categoryId),
                quantityPerUnit: values.quantityPerUnit,
                unitPrice: parseFloat(values.unitPrice.toString()),
                unitsInStock: parseInt(values.unitsInStock.toString()),
            });
            setSuccess(true);
            resetForm();
        } catch {
            setError("Something went wrong while creating the product.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <GenericForm
            title="Create New Product"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            fields={fields}
            isSubmitting={isPending}
            submitLabel="Create Product"
            successMessage={success && "Product created successfully!"}
            errorMessage={error}
        />
    );
}