import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosIsntance from "src/utils/lib/axios";
import CustomDropdown from "src/components/CustimDropdown";
import { agencies } from "src/utils/util/fakeData";
import MainTable from "src/components/MainTable";

const MainPage = () => {
  let token = localStorage.getItem("access_token");
  const [packages, setPackages] = useState(agencies);
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
   <></>
  );
};

export default MainPage;
