import { observer } from "mobx-react-lite"
import ActionsTable from "../Home/ActionsTable"

export default observer(function HomePage() {
  return (
    <main style={{ padding: '2rem', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#007acc' }}>Welcome to Northwind Product Management</h1>
      <ActionsTable />
    </main>
  );
});