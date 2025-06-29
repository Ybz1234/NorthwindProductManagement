import { observer } from "mobx-react-lite"
import ActionsTable from "../Home/ActionsTable"

export default observer(function HomePage() {
  return (
    <>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#007acc' }}>Welcome to Northwind Product Management</h1>
      <ActionsTable />
    </>
  );
});