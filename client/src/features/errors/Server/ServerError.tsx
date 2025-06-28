import { useStore } from "../../../app/stores/store";
import "./ServerError.css";

export default function ServerError() {
  const { commonStore } = useStore();

  return (
    <div className="server-error-container">
      <h1>Server Error</h1>
      <h5 className="error-message">{commonStore.error?.message}</h5>
      {commonStore.error?.details && (
        <div className="error-details">
          <h4>Stack trace</h4>
          <code>{commonStore.error.details}</code>
        </div>
      )}
    </div>
  );
}