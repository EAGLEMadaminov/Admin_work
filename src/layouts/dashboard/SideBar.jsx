import React from "react";
import { Link } from "react-router-dom";
import Voice from "../../assets/icons/voice.png";
import List from "../../assets/icons/list.png";
import Chart from "../../assets/icons/chart.png";
import Help from "../../assets/icons/help.png";

const SideBar = () => {
  return (
    <div className="py-7 pl-7 pr-4 w-[250px]  bg-[#00428008] flex flex-col justify-between h-[100vh] fixed">
      <div>
        <div className="w-[180px]">
          <h3 className="text-text font-[400] text-[30px]">
            Tour <span className="text-[#FF9B06]">Agency</span>{" "}
          </h3>
          <p className="text-[#1B2126] text-[12px]">
            Все туры в одном месте – открой мир с нами!
          </p>
        </div>

        <ul className="flex flex-col w-[100%] gap-[10px] mt-[20px] text-[14px] font-[500]">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center  bg-[#0042800F] p-3 rounded-lg gap-2 w-full text-text"
            >
              <img
                src={Voice}
                alt="Voice icon image "
                className="w-[20px] h-[20px]"
              />
              Мои объявления
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/agency/posts"
              className="flex items-center hover:bg-[#0042800F] p-3 rounded-lg gap-2 text-text"
            >
              <img
                src={List}
                alt="List icon image"
                className="w-[20px] h-[20px]"
              />
              Заявки
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/agency/notifications"
              className="flex items-center hover:bg-[#0042800F] gap-2 p-3 rounded-lg text-text"
            >
              <img
                src={Chart}
                alt="image icon image"
                className="w-[20px] h-[20px]"
              />
              Статистика
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/agency"
              className="flex items-center hover:bg-[#0042800F] p-3 rounded-lg  gap-2 text-text"
            >
              <img
                src={Help}
                alt="Help icon image"
                className="w-[20px] h-[20px]"
              />
              Помощь
            </Link>
          </li>
        </ul>
      </div>

      <button className="flex items-center gap-[10px] w-[90%] p-[10px]  rounded-lg justify-center bg-[#FF9B06] text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-rocket-takeoff-fill"
          viewBox="0 0 16 16"
        >
          <path d="M12.17 9.53c2.307-2.592 3.278-4.684 3.641-6.218.21-.887.214-1.58.16-2.065a3.6 3.6 0 0 0-.108-.563 2 2 0 0 0-.078-.23V.453c-.073-.164-.168-.234-.352-.295a2 2 0 0 0-.16-.045 4 4 0 0 0-.57-.093c-.49-.044-1.19-.03-2.08.188-1.536.374-3.618 1.343-6.161 3.604l-2.4.238h-.006a2.55 2.55 0 0 0-1.524.734L.15 7.17a.512.512 0 0 0 .433.868l1.896-.271c.28-.04.592.013.955.132.232.076.437.16.655.248l.203.083c.196.816.66 1.58 1.275 2.195.613.614 1.376 1.08 2.191 1.277l.082.202c.089.218.173.424.249.657.118.363.172.676.132.956l-.271 1.9a.512.512 0 0 0 .867.433l2.382-2.386c.41-.41.668-.949.732-1.526zm.11-3.699c-.797.8-1.93.961-2.528.362-.598-.6-.436-1.733.361-2.532.798-.799 1.93-.96 2.528-.361s.437 1.732-.36 2.531Z" />
          <path d="M5.205 10.787a7.6 7.6 0 0 0 1.804 1.352c-1.118 1.007-4.929 2.028-5.054 1.903-.126-.127.737-4.189 1.839-5.18.346.69.837 1.35 1.411 1.925" />
        </svg>
        Правила
      </button>
    </div>
  );
};

export default SideBar;
