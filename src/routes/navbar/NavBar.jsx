import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default NavBar;
