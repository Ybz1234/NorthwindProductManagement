import { useField } from 'formik';
import './MySelectInput.css';

interface Props {
  placeholder: string;
  name: string;
  options: { text: string; value: string }[];
  label?: string;
}

export default function MySelectInput({ label, ...props }: Props) {
  const [field, meta, helpers] = useField(props.name);

  return (
    <div className={`form-field ${meta.touched && meta.error ? 'error' : ''}`}>
      {label && <label htmlFor={props.name}>{label}</label>}
      <select
        id={props.name}
        value={field.value}
        onChange={(e) => helpers.setValue(e.target.value)}
        onBlur={() => helpers.setTouched(true)}
        className="custom-select"
      >
        <option value="">{props.placeholder}</option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="error-label">{meta.error}</div>
      )}
    </div>
  );
}