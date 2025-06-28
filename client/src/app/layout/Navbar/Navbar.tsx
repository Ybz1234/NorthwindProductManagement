import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { observer } from "mobx-react-lite";
import ThemeToggle from "../Theme/ThemeToggle";

export default observer(function Navbar() {
    const [actionsOpen, setActionsOpen] = useState(false);

    const toggleActions = () => setActionsOpen(!actionsOpen);
    const closeActions = () => setActionsOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="dropdown" onBlur={closeActions} tabIndex={0}>
                    <button className="dropdown-toggle" onClick={toggleActions}>
                        Actions ▾
                    </button>
                    {actionsOpen && (
                        <ul className="dropdown-menu">
                            <li>
                                <button onClick={() => alert("Export CSV")}>Export CSV</button>
                            </li>
                            <li>
                                <button onClick={() => alert("Bulk Ops")}>Bulk Manage</button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>

            <div className="navbar-center">
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
});