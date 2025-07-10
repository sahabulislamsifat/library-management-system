import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <nav className="text-green-500">This is Navbar</nav>
      <div className="min-h-[calc(100vh-304px)]">
        <Outlet></Outlet>
      </div>
      <footer>This is Footer</footer>
    </div>
  );
};

export default MainLayout;
