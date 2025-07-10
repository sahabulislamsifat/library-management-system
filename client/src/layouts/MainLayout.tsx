import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-304px)]">
        <Outlet></Outlet>
      </div>
      <footer>This is Footer</footer>
    </div>
  );
};

export default MainLayout;
