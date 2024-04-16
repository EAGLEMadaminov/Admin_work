import propTypes from "prop-types";
import SideBar from "./SideBar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />
      {children}
    </div>
  );
};

export default DashboardLayout;

DashboardLayout.propTypes = {
  children: propTypes.node,
};
