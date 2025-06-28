import { useField } from 'formik';
import './MyTextInput.css';

interface Props {
  placeholder: string;
  name: string;
  label?: string;
  type?: string;
}

export default function MyTextInput({ label, ...props }: Props) {
  const [field, meta] = useField(props.name);

  return (
    <div className={`form-field ${meta.touched && meta.error ? 'error' : ''}`}>
      {label && <label htmlFor={props.name}>{label}</label>}
      <input {...field} {...props} id={props.name} className="custom-input" />
      {meta.touched && meta.error && (
        <div className="error-label">{meta.error}</div>
      )}
    </div>
  );
}