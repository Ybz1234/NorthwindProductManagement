import axios from "axios";
import { useState } from "react";
import ValidationError from "./ValidationError";
import "./TestErrors.css";

export default function TestErrors() {
  const baseUrl = import.meta.env.VITE_API_URL + "/api/";
  const [errors, setErrors] = useState<string[] | null>(null);

  function handleRequest(endpoint: string) {
    axios.get(baseUrl + endpoint).catch((err) => {
      const data = err?.response?.data;
      setErrors(data?.errors || [data?.message || "Unknown error"]);
    });
  }

  function handleValidationError() {
    axios.post(baseUrl + "products", {}).catch((err) => {
      const data = err?.response?.data;
      setErrors(data?.errors || [data?.message || "Validation failed"]);
    });
  }

  return (
    <div className="test-errors">
      <h2>Test Error Component</h2>
      <div className="button-group">
        <button onClick={() => handleRequest("buggy/not-found")}>Not Found</button>
        <button onClick={() => handleRequest("buggy/bad-request")}>Bad Request</button>
        <button onClick={handleValidationError}>Validation Error</button>
        <button onClick={() => handleRequest("buggy/server-error")}>Server Error</button>
        <button onClick={() => handleRequest("buggy/unauthorised")}>Unauthorised</button>
        <button onClick={() => handleRequest("products/notaguid")}>Bad Guid</button>
      </div>
      {errors && <ValidationError errors={errors} />}
    </div>
  );
}