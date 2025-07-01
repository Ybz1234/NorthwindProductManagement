import { observer } from "mobx-react-lite";
import Header from "../Home/Header";
import ActionsCard from "../Home/ActionsCard";
import TopExpensiveProductsChart from "../Products/TopExpensiveProductsChart";

export default observer(function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "Segoe UI, Roboto, sans-serif",
        color: "var(--text-color)",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "var(--card-bg)",
          borderRadius: "16px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
          padding: "2.5rem",
          textAlign: "center",
          animation: "fadeIn 1s ease-in-out",
          border: "1px solid var(--border-color)",
        }}
      >
        <Header />
        <hr
          style={{
            margin: "2rem 0",
            borderTop: "2px dashed var(--border-color)",
          }}
        />
        <ActionsCard />

        <div style={{ marginTop: "3rem" }}>
          <TopExpensiveProductsChart />
        </div>
      </div>
    </div>
  );
});
