import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";
import GenericForm from "../components/GenericForm";
import type { Option, FieldConfig } from "../components/GenericForm";
import agent from "../../app/api/agent";
import type { IProductDetailsDto } from "../../app/models/productDetails";
import type { ICategoryDto } from "../../app/models/categoryDto";
import type { ISupplierDto } from "../../app/models/supplierDto";
import { useStore } from "../../app/stores/store";

type Props = {
  productId: number;
  onClose: () => void;
};

export default function EditProductForm({ productId, onClose }: Props) {
  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => agent.Products.getById(productId),
  });

  const { commonStore: { categories, suppliers } } = useStore();

  if (isLoading) return <p className="loading-text">Loading product...</p>;
  if (isError) return <p className="error-text">Error: {(error as Error).message}</p>;
  if (!product || !categories || !suppliers) return null;

  const categoryOptions: Option[] = categories.map((cat: ICategoryDto) => ({
    text: cat.categoryName,
    value: cat.categoryId,
  }));

  const supplierOptions: Option[] = suppliers.map((sup: ISupplierDto) => ({
    text: sup.companyName,
    value: sup.supplierId,
  }));

  const initialValues: IProductDetailsDto = {
    productID: product.productID,
    productName: product.productName ?? "",
    categoryId: categories.find((c) => c.categoryName === product.category)?.categoryId ?? 0,
    supplierId: suppliers.find((s) => s.companyName === product.supplier)?.supplierId ?? 0,
    quantityPerUnit: product.quantityPerUnit ?? "",
    unitPrice: product.unitPrice ?? 0,
    unitsInStock: product.unitsInStock ?? 0,
    unitsOnOrder: product.unitsOnOrder ?? 0,
    reorderLevel: product.reorderLevel ?? 0,
    discontinued: product.discontinued ?? false,
    category: product.category ?? "",
    supplier: product.supplier ?? "",
  };

  const validationSchema = Yup.object({
    productName: Yup.string().trim().required("Product Name is required."),
    categoryId: Yup.number().moreThan(0, "Category is required."),
    supplierId: Yup.number().moreThan(0, "Supplier is required."),
    unitPrice: Yup.number().min(0, "Unit Price cannot be negative."),
    unitsInStock: Yup.number().min(0, "Units In Stock cannot be negative."),
    unitsOnOrder: Yup.number().min(0, "Units On Order cannot be negative."),
    reorderLevel: Yup.number().min(0, "Reorder Level cannot be negative."),
  });

  const fields: FieldConfig[] = [
    { name: "productName", label: "Product Name", placeholder: "Enter product name" },
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      options: categoryOptions,
    },
    {
      name: "supplierId",
      label: "Supplier",
      type: "select",
      options: supplierOptions,
    },
    { name: "quantityPerUnit", label: "Quantity Per Unit", placeholder: "e.g., 10 boxes x 20 bags" },
    { name: "unitPrice", label: "Unit Price", type: "number", placeholder: "Unit price" },
    { name: "unitsInStock", label: "Units In Stock", type: "number", placeholder: "Units in stock" },
    { name: "unitsOnOrder", label: "Units On Order", type: "number", placeholder: "Units on order" },
    { name: "reorderLevel", label: "Reorder Level", type: "number", placeholder: "Reorder level" },
    { name: "discontinued", label: "Discontinued", type: "checkbox" },
  ];

  const handleSubmit = async (values: IProductDetailsDto) => {
    if (!window.confirm("Are you sure you want to update this product?")) return;

    try {
      await agent.Products.update(productId, {
        productName: values.productName,
        supplierId: Number(values.supplierId),
        categoryId: Number(values.categoryId),
        quantityPerUnit: values.quantityPerUnit,
        unitPrice: Number(values.unitPrice),
        unitsInStock: Number(values.unitsInStock),
        unitsOnOrder: Number(values.unitsOnOrder),
        reorderLevel: Number(values.reorderLevel),
        discontinued: values.discontinued,
      });
      toast.success("Product updated successfully");
      onClose();
    } catch (err) {
      toast.error("Failed to update product");
      console.error(err);
    }
  };

  return (
    <GenericForm<IProductDetailsDto>
      title={`Edit Product (ID: ${product.productID})`}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      fields={fields}
      submitLabel="Save Changes"
      onCancel={onClose}
    />
  );
}