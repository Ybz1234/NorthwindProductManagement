import DateTime from "./DateTime";
import Greeting from "./Greeting";

export default function Header() {
    return (
        <>
            <h1
                style={{
                    fontSize: "2.75rem",
                    marginBottom: "0.25rem",
                    fontWeight: 700,
                }}
            >
                <Greeting />
            </h1>
            <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                Welcome to <strong>Northwind Product Management</strong>
            </p>
            <DateTime />
        </>
    );
}