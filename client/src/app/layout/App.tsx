import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { useStore } from "../stores/store";
import { useEffect } from "react";

export default function App() {
  const { commonStore: { loadCategories, loadSuppliers } } = useStore();

  useEffect(() => {
    loadCategories();
    loadSuppliers();
  }), [];
  
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}