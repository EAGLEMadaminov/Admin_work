import React, { useEffect, useState } from "react";
import axiosIsntance from "src/utils/lib/axios";

const AgencyInfo = () => {
  const [agencyInfo, setAgencyInfo] = useState([]);
  let token = localStorage.getItem("access_token");

  useEffect(() => {
    (async function getAgencyInfo() {
      try {
        let { data } = await axiosIsntance.get("/admin/agency/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data) {
          setAgencyInfo(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token]);
  return <div>AgencyInfo</div>;
};

export default AgencyInfo;
