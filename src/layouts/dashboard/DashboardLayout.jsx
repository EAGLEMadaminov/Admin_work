import propTypes from "prop-types";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosIsntance from "src/utils/lib/axios";

const DashboardLayout = ({ children }) => {
  let token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    (async function getAgency() {
      try {
        let { data } = await axiosIsntance.get("/admin/agency/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data) {
          console.log(data);
          navigate("/dashboard/agency");
        } else {
          navigate("/auth/sign-up");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token]);
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
