import { useField } from 'formik';
import './MyTextArea.css';

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
}

export default function MyTextArea({ label, ...props }: Props) {
    const [field, meta] = useField(props.name);

    return (
        <div className={`form-field ${meta.touched && meta.error ? 'error' : ''}`}>
            {label && <label htmlFor={props.name}>{label}</label>}
            <textarea
                {...field}
                {...props}
                id={props.name}
                className="custom-textarea"
            />
            {meta.touched && meta.error && (
                <div className="error-label">{meta.error}</div>
            )}
        </div>
    );
}