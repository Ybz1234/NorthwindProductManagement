import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useCreateProduct } from '../../app/hooks/useCreateProduct';
import { useCategories } from '../../app/hooks/useCategories';
import { useSuppliers } from '../../app/hooks/useSuppliers';
import MyTextInput from '../../app/common/form/TextInput/MyTextInput';
import MySelectInput from '../../app/common/form/Select/MySelectInput';
import SuccessBanner from '../components/SuccessBanner';
import './CreateProductForm.css';

export default function CreateProductForm() {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const { mutateAsync, isPending } = useCreateProduct();
    const { data: categories = [], isLoading: loadingCategories } = useCategories();
    const { data: suppliers = [], isLoading: loadingSuppliers } = useSuppliers();

    const supplierOptions = suppliers.map(s => ({
        text: s.companyName,
        value: s.supplierId.toString(),
    }));

    const categoryOptions = categories.map(c => ({
        text: c.categoryName,
        value: c.categoryId.toString(),
    }));

    return (
        <div className="form-wrapper">
            <h2>Create New Product</h2>

            {success && <SuccessBanner message="Product created successfully!" onClose={() => setSuccess(false)} />}
            {error && <div className="error-banner">{error}</div>}

            <Formik
                initialValues={{
                    productName: '',
                    supplierId: '',
                    categoryId: '',
                    quantityPerUnit: '',
                    unitPrice: '',
                    unitsInStock: '',
                }}
                validationSchema={Yup.object({
                    productName: Yup.string().required('Required'),
                    supplierId: Yup.string().required('Required'),
                    categoryId: Yup.string().required('Required'),
                    quantityPerUnit: Yup.string().required('Required'),
                    unitPrice: Yup.number().required('Required').positive('Must be positive'),
                    unitsInStock: Yup.number().required('Required').min(0, 'Cannot be negative'),
                })}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setError('');
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
                    } catch (err) {
                        setError('Something went wrong while creating the product.');
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="product-form">
                        <MyTextInput name="productName" placeholder="Enter name" label="Product Name" />
                        <MySelectInput
                            name="supplierId"
                            placeholder={loadingSuppliers ? 'Loading suppliers...' : 'Select supplier'}
                            label="Supplier"
                            options={supplierOptions}
                        />
                        <MySelectInput
                            name="categoryId"
                            placeholder={loadingCategories ? 'Loading categories...' : 'Select category'}
                            label="Category"
                            options={categoryOptions}
                        />
                        <MyTextInput name="quantityPerUnit" placeholder="e.g. 6 bottles" label="Quantity Per Unit" />
                        <MyTextInput name="unitPrice" placeholder="e.g. 12.5" label="Unit Price" type="number" />
                        <MyTextInput name="unitsInStock" placeholder="e.g. 100" label="Units in Stock" type="number" />

                        <button type="submit" disabled={isSubmitting || isPending} className="submit-btn">
                            {isSubmitting || isPending ? 'Submitting...' : 'Create Product'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}