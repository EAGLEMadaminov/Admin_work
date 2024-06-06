import propTypes from 'prop-types';
import SideBar from './SideBar';
import { useDispatch } from 'react-redux';
import { checkOptions } from 'src/redux/slices/header';

const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="flex bg-[white]"
      // onClick={() => dispatch(checkOptions(false))}
    >
      <SideBar />
      <div className="ml-[250px]">{children}</div>
    </div>
  );
};

export default DashboardLayout;

DashboardLayout.propTypes = {
  children: propTypes.node,
};
