import { useState } from 'react';
import { agencies } from '../utils/util/fakeData';
import { useNavigate } from 'react-router-dom';
const DashboardTable = () => {
  const [packages, setPackages] = useState(agencies);
  const navigate = useNavigate();
  return (
    <div className="mt-10">
      <div className="flex text-text font-[600] px-4 mb-5">
        <div className="w-[250px] flex-shrink-0">
          <h2>Топ-5 объялений</h2>
        </div>
        <div className="w-[200px]">
          <h2>Дата создания</h2>
        </div>
        <div className="w-[200px]">
          <h2>Статус</h2>
        </div>
        <div className="w-[200px]">
          <h2>Просмотрели</h2>
        </div>
        <div className="w-[200px]">
          <button
            onClick={() => navigate('/dashboard/agency/posts')}
            className="text-[13px] flex gap-3 items-center text-[#D1DCE5]"
          >
            Все объявления{' '}
            <span className="font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                className="bi bi-chevron-right font-bold text-text"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {packages.map((item) => {
        return (
          <div
            key={item.id}
            onClick={() => navigate(`/dashboard/agency/posts/view/${item.id}`)}
            className="flex px-4 py-3 rounded-xl"
          >
            <div className="flex w-[250px] flex-shrink-0 gap-[10px] items-center">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="1"
                  width="19"
                  height="19"
                  rx="5.5"
                  fill="white"
                />
                <rect
                  x="0.5"
                  y="1"
                  width="19"
                  height="19"
                  rx="5.5"
                  stroke="#FF9B06"
                />
                <path
                  d="M14.6668 7L8.25016 13.4167L5.3335 10.5"
                  stroke="#FF9B06"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <img src={item.image} alt="" />
              <div>
                <h3 className="p-0 m-0 text-text font-[600]">Mascan</h3>
                <p className="m-0 p-0 text-[#B3C6D9]">mascantravel.uz</p>
              </div>
            </div>
            <div className="flex w-[200px] items-center">
              <h2 className="text-text">{item.createdAt}</h2>
            </div>
            <div className="flex w-[200px] items-center">
              {item.isActive ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check-lg text-[#17A700] ml-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-x-lg text-[#FF0000] ml-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              )}
            </div>
            <div className="flex w-[200px] gap-[15px] ">
              <p className="text-[14px] font-[700] text-text">11 222</p>
            </div>
            <div className="flex w-[200px] gap-[15px] ">
              <button
                onClick={() =>
                  navigate(`/dashboard/agency/posts/view/${item.id}`)
                }
                className="py-1 px-4 text-[14px] font-[500] text-text bg-[#EDF2F6] border rounded-[32px]"
              >
                Подробнее
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardTable;
