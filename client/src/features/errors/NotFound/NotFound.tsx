import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h2>Oops - we couldn't find what you're looking for.</h2>
      <Link to="/home" className="btn">
        Return to home page
      </Link>
    </div>
  );
}