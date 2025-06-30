import ActionsTable from "./ActionsTable";

export default function ActionsCard() {
    return (
        <div
            style={{
                backgroundColor: "var(--card-bg)",
                padding: "1.5rem",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
            }}
        >
            <ActionsTable />
        </div>
    );
}