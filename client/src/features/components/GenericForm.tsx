import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers, FormikValues } from "formik";
import type { ReactNode } from "react";
import './GenericForm.css';

export type Option = { text: string; value: string | number };

export type FieldConfig =
    | {
        name: string;
        label: string;
        type?: "text" | "number" | "checkbox" | "select";
        placeholder?: string;
        options?: Option[];
        className?: string;
    };

export type GenericFormProps<T extends FormikValues> = {
    title: string;
    initialValues: T;
    validationSchema?: any;
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
    fields: FieldConfig[];
    isSubmitting?: boolean;
    submitLabel: string;
    onCancel?: () => void;
    successMessage?: string | ReactNode;
    errorMessage?: string | ReactNode;
};

export default function GenericForm<T extends FormikValues>({
    title,
    initialValues,
    validationSchema,
    onSubmit,
    fields,
    isSubmitting = false,
    submitLabel,
    onCancel,
    successMessage,
    errorMessage,
}: GenericFormProps<T>) {
    return (
        <div className="generic-form-wrapper">
            <h2>{title}</h2>
            {successMessage && <div className="success-banner">{successMessage}</div>}
            {errorMessage && <div className="error-banner">{errorMessage}</div>}

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ errors, touched }) => (
                    <Form className="generic-form">
                        {fields.map(({ name, label, type = "text", placeholder, options, className }) => (
                            <div
                                className={`form-group ${type === "checkbox" ? "checkbox-group" : ""}`}
                                key={name}
                            >
                                {type !== "checkbox" && <label htmlFor={name}>{label}</label>}
                                {type === "text" || type === "number" ? (
                                    <Field
                                        id={name}
                                        name={name}
                                        type={type}
                                        placeholder={placeholder}
                                        className={`custom-input ${touched[name] && errors[name] ? "input-error" : ""
                                            } ${className ?? ""}`}
                                    />
                                ) : type === "select" && options ? (
                                    <Field
                                        as="select"
                                        id={name}
                                        name={name}
                                        className={`custom-input ${touched[name] && errors[name] ? "input-error" : ""
                                            } ${className ?? ""}`}
                                    >
                                        <option value="">-- Select {label} --</option>
                                        {options.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.text}
                                            </option>
                                        ))}
                                    </Field>
                                ) : type === "checkbox" ? (
                                    <label className="checkbox-label" htmlFor={name}>
                                        <Field
                                            id={name}
                                            name={name}
                                            type="checkbox"
                                            className={className}
                                        />
                                        {label}
                                    </label>
                                ) : null}
                                <ErrorMessage
                                    name={name}
                                    component="div"
                                    className="validation-error"
                                />
                            </div>
                        ))}

                        <div className="button-group">
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Submitting..." : submitLabel}
                            </button>
                            {onCancel && (
                                <button
                                    type="button"
                                    className="btn-secondary"
                                    onClick={onCancel}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}