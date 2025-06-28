import "./ValidationError.css";

interface Props {
  errors: string[];
}

export default function ValidationError({ errors }: Props) {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="validation-error">
      <ul>
        {errors.map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
    </div>
  );
}