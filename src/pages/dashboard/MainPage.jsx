import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosIsntance from "src/utils/lib/axios";

const MainPage = () => {
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
  return <div>mainPage</div>;
};

export default MainPage;