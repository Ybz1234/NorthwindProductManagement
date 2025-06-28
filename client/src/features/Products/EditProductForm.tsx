// import { Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import { useState } from 'react';
// import { useProduct } from '../../app/hooks/useProduct';
// import { useCategories } from '../../app/hooks/useCategories';
// import { useSuppliers } from '../../app/hooks/useSuppliers';
// import { useUpdateProduct } from '../../app/hooks/useUpdateProduct';
// import MyTextInput from '../../app/common/form/TextInput/MyTextInput';
// import MySelectInput from '../../app/common/form/Select/MySelectInput';
// import SuccessBanner from '../components/SuccessBanner';
// import './EditProductForm.css';

// interface EditProductFormProps {
//     productId: number;
//     onSaved?: () => void; // callback after successful save
// }

// export default function EditProductForm({ productId, onSaved }: EditProductFormProps) {
//     const { data: product, isLoading: loadingProduct, error: productError } = useProduct(productId);
//     const { data: categories = [], isLoading: loadingCategories } = useCategories();
//     const { data: suppliers = [], isLoading: loadingSuppliers } = useSuppliers();

//     // Note: useMutation returns isPending, not isLoading
//     const { mutateAsync, isPending: isSaving } = useUpdateProduct();

//     const [success, setSuccess] = useState(false);
//     const [error, setError] = useState('');

//     // Prepare dropdown options
//     const supplierOptions = suppliers.map(s => ({
//         text: s.companyName,
//         value: s.supplierId.toString(),
//     }));

//     const categoryOptions = categories.map(c => ({
//         text: c.categoryName,
//         value: c.categoryId.toString(),
//     }));

//     // Confirm before save
//     const confirmSave = () => window.confirm('Are you sure you want to save changes?');

//     if (loadingProduct) return <p>Loading product details...</p>;
//     if (productError) return <p>Error loading product: {productError.message}</p>;
//     if (!product) return <p>Product not found</p>;

//     return (
//         <div className="form-wrapper">
//             <h2>Edit Product - ID {productId}</h2>

//             {success && (
//                 <SuccessBanner
//                     message="Product updated successfully!"
//                     onClose={() => setSuccess(false)}
//                 />
//             )}
//             {error && <div className="error-banner">{error}</div>}

//             <Formik
//                 initialValues={{
//                     productName: product.productName ?? '',
//                     supplierId: product.supplierId?.toString() ?? '',
//                     categoryId: product.categoryId?.toString() ?? '',
//                     quantityPerUnit: product.quantityPerUnit ?? '',
//                     unitPrice: product.unitPrice ?? 0,
//                     unitsInStock: product.unitsInStock ?? 0,
//                     unitsOnOrder: product.unitsOnOrder ?? 0,
//                     reorderLevel: product.reorderLevel ?? 0,
//                     discontinued: product.discontinued ?? false,
//                 }}
//                 validationSchema={Yup.object({
//                     productName: Yup.string().required('Required'),
//                     supplierId: Yup.string().required('Required'),
//                     categoryId: Yup.string().required('Required'),
//                     quantityPerUnit: Yup.string().required('Required'),
//                     unitPrice: Yup.number().required('Required').positive('Must be positive'),
//                     unitsInStock: Yup.number().required('Required').min(0, 'Cannot be negative'),
//                     unitsOnOrder: Yup.number().min(0, 'Cannot be negative'),
//                     reorderLevel: Yup.number().min(0, 'Cannot be negative'),
//                     discontinued: Yup.boolean(),
//                 })}
//                 onSubmit={async (values, { setSubmitting }) => {
//                     setError('');
//                     if (!confirmSave()) {
//                         setSubmitting(false);
//                         return;
//                     }
//                     try {
//                         await mutateAsync({
//                             id: productId,
//                             product: {
//                                 productName: values.productName,
//                                 supplierId: parseInt(values.supplierId),
//                                 categoryId: parseInt(values.categoryId),
//                                 quantityPerUnit: values.quantityPerUnit,
//                                 unitPrice: values.unitPrice,
//                                 unitsInStock: values.unitsInStock,
//                                 unitsOnOrder: values.unitsOnOrder,
//                                 reorderLevel: values.reorderLevel,
//                                 discontinued: values.discontinued,
//                             }
//                         });
//                         setSuccess(true);
//                         if (onSaved) onSaved();
//                     } catch {
//                         setError('Something went wrong while updating the product.');
//                     } finally {
//                         setSubmitting(false);
//                     }
//                 }}
//             >
//                 {({ isSubmitting, values, setFieldValue }) => (
//                     <Form className="product-form">
//                         <div><strong>Product ID: {productId}</strong></div>

//                         <MyTextInput name="productName" placeholder="Enter name" label="Product Name" />

//                         <MySelectInput
//                             name="supplierId"
//                             placeholder={loadingSuppliers ? 'Loading suppliers...' : 'Select supplier'}
//                             label="Supplier"
//                             options={supplierOptions}
//                         />

//                         <MySelectInput
//                             name="categoryId"
//                             placeholder={loadingCategories ? 'Loading categories...' : 'Select category'}
//                             label="Category"
//                             options={categoryOptions}
//                         />

//                         <MyTextInput name="quantityPerUnit" placeholder="e.g. 6 bottles" label="Quantity Per Unit" />
//                         <MyTextInput name="unitPrice" placeholder="e.g. 12.5" label="Unit Price" type="number" />
//                         <MyTextInput name="unitsInStock" placeholder="e.g. 100" label="Units in Stock" type="number" />
//                         <MyTextInput name="unitsOnOrder" placeholder="e.g. 0" label="Units On Order" type="number" />
//                         <MyTextInput name="reorderLevel" placeholder="e.g. 0" label="Reorder Level" type="number" />

//                         <label className="checkbox-label">
//                             <input
//                                 type="checkbox"
//                                 name="discontinued"
//                                 checked={values.discontinued}
//                                 onChange={() => setFieldValue('discontinued', !values.discontinued)}
//                             />
//                             Discontinued
//                         </label>

//                         <button type="submit" disabled={isSubmitting || isSaving} className="submit-btn">
//                             {isSubmitting || isSaving ? 'Saving...' : 'Save Changes'}
//                         </button>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// }
