import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import agent from "../../app/api/agent";
import { useCategories } from "../../app/hooks/useCategories";
import { useSuppliers } from "../../app/hooks/useSuppliers";
import type { IProductDetailsDto } from "../../app/models/productDetails";
import type { ICategoryDto } from "../../app/models/categoryDto";
import type { ISupplierDto } from "../../app/models/supplierDto";
import MyTextInput from "../../app/common/form/TextInput/MyTextInput";
import "./EditProductForm.css";

type Props = {
  productId: number;
  onClose: () => void;
};

export default function EditProductForm({ productId, onClose }: Props) {
  const { data: product, isLoading, isError, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => agent.Products.getById(productId),
  });

  const { data: categories } = useCategories();
  const { data: suppliers } = useSuppliers();

  if (isLoading) return <p className="loading-text">Loading product...</p>;
  if (isError) return <p className="error-text">Error: {(error as Error).message}</p>;
  if (!product || !categories || !suppliers) return null;

  // Find category and supplier IDs from names for initial values
  const categoryObj = categories.find(
    (cat: ICategoryDto) => cat.categoryName === product.category
  );
  const supplierObj = suppliers.find(
    (sup: ISupplierDto) => sup.companyName === product.supplier
  );

  const initialValues: IProductDetailsDto = {
    productID: product.productID,
    productName: product.productName ?? "",
    categoryId: categoryObj?.categoryId ?? 0,
    supplierId: supplierObj?.supplierId ?? 0,
    quantityPerUnit: product.quantityPerUnit ?? "",
    unitPrice: product.unitPrice ?? 0,
    unitsInStock: product.unitsInStock ?? 0,
    unitsOnOrder: product.unitsOnOrder ?? 0,
    reorderLevel: product.reorderLevel ?? 0,
    discontinued: product.discontinued ?? false,
    category: product.category ?? "",
    supplier: product.supplier ?? "",
  };

  const validate = (values: IProductDetailsDto) => {
    const errors: Partial<Record<keyof IProductDetailsDto, string>> = {};
    if (!values.productName.trim()) {
      errors.productName = "Product Name is required.";
    }
    if (!values.categoryId || values.categoryId === 0) {
      errors.categoryId = "Category is required.";
    }
    if (!values.supplierId || values.supplierId === 0) {
      errors.supplierId = "Supplier is required.";
    }
    if (values.unitPrice < 0) {
      errors.unitPrice = "Unit Price cannot be negative.";
    }
    if (values.unitsInStock < 0) {
      errors.unitsInStock = "Units In Stock cannot be negative.";
    }
    if (values.unitsOnOrder < 0) {
      errors.unitsOnOrder = "Units On Order cannot be negative.";
    }
    if (values.reorderLevel < 0) {
      errors.reorderLevel = "Reorder Level cannot be negative.";
    }
    return errors;
  };

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
    <div className="edit-product-form">
      <h2 className="form-title">Edit Product</h2>
      <p className="product-id">
        <strong>Product ID:</strong> {product.productID}
      </p>

      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
        enableReinitialize // important to update when product loads
      >
        {({ isSubmitting }) => (
          <Form noValidate>
            <MyTextInput
              label="Product Name"
              name="productName"
              placeholder="Enter product name"
            />

            <div className="form-group">
              <label htmlFor="categoryId">Category<span className="required">*</span></label>
              <Field
                as="select"
                id="categoryId"
                name="categoryId"
                className="custom-input"
              >
                <option value={0}>-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat.categoryId} value={cat.categoryId}>
                    {cat.categoryName}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="categoryId" component="div" className="error-label" />
            </div>

            <div className="form-group">
              <label htmlFor="supplierId">Supplier<span className="required">*</span></label>
              <Field
                as="select"
                id="supplierId"
                name="supplierId"
                className="custom-input"
              >
                <option value={0}>-- Select Supplier --</option>
                {suppliers.map((sup) => (
                  <option key={sup.supplierId} value={sup.supplierId}>
                    {sup.companyName}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="supplierId" component="div" className="error-label" />
            </div>

            <MyTextInput
              label="Quantity Per Unit"
              name="quantityPerUnit"
              placeholder="e.g., 10 boxes x 20 bags"
            />

            <MyTextInput
              label="Unit Price"
              name="unitPrice"
              type="number"
              placeholder="Unit price"
            />

            <MyTextInput
              label="Units In Stock"
              name="unitsInStock"
              type="number"
              placeholder="Units in stock"
            />

            <MyTextInput
              label="Units On Order"
              name="unitsOnOrder"
              type="number"
              placeholder="Units on order"
            />

            <MyTextInput
              label="Reorder Level"
              name="reorderLevel"
              type="number"
              placeholder="Reorder level"
            />

            <div className="form-group checkbox-group">
              <label className="checkbox-label" htmlFor="discontinued">
                <Field
                  type="checkbox"
                  id="discontinued"
                  name="discontinued"
                />
                Discontinued
              </label>
            </div>

            <div className="button-group">
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                Save Changes
              </button>
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
