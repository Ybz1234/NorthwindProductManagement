import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}