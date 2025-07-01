import { Link } from "react-router-dom";
import "./Navbar.css";
import { observer } from "mobx-react-lite";
import ThemeToggle from "../Theme/ThemeToggle";

export default observer(function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="home-icon" title="Home">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="32"
                        width="32"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                </Link>
            </div>

            <div className="navbar-right">
                <ThemeToggle />
            </div>
        </nav>
    );
})
