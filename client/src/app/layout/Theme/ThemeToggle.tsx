import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        return (localStorage.getItem("theme") as "light" | "dark") || "light";
    });

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <>
            <style>{`
        .toggle {
          cursor: pointer;
          width: 60px;
          height: 30px;
          background: var(--toggle-bg, #ddd);
          border-radius: 15px;
          position: relative;
          display: flex;
          align-items: center;
          padding: 0 5px;
          user-select: none;
          transition: background-color 0.3s ease;
        }
        .toggle.dark {
          background: var(--toggle-bg-dark, #222);
        }
        .knob {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          transition: left 0.3s ease;
          z-index: 2;
        }
        .toggle.dark .knob {
          left: 33px;
        }
        .icon {
          width: 18px;
          height: 18px;
          fill: #f39c12;
          transition: fill 0.3s ease;
          z-index: 1;
        }
        .icon.moon {
          fill: #f1c40f;
        }
        .icon.sun {
          fill: #f39c12;
        }
        .icons-wrapper {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 5px;
          pointer-events: none;
          user-select: none;
        }
      `}</style>

            <button
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                onClick={toggleTheme}
                className={`toggle ${theme === "dark" ? "dark" : ""}`}
                type="button"
            >
                <div className="knob" />
                <div className="icons-wrapper">
                    <svg
                        className="icon sun"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="5" />
                        <g stroke="#f39c12" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="4" />
                            <line x1="12" y1="20" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                            <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                            <line x1="1" y1="12" x2="4" y2="12" />
                            <line x1="20" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                            <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                        </g>
                    </svg>

                    <svg
                        className="icon moon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path d="M21 12.79A9 9 0 0112.21 3 7 7 0 1012 21a9 9 0 009-8.21z" />
                    </svg>
                </div>
            </button>
        </>
    );
}
