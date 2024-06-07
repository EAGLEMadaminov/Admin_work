import propTypes from 'prop-types';
import SideBar from './SideBar';
import Header from './Header';
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex bg-[white]">
      <SideBar />
      <div className="flex flex-col">
        <Header />
        <div className="ml-[270px] ">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

DashboardLayout.propTypes = {
  children: propTypes.node,
};
