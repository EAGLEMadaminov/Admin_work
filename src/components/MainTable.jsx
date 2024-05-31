import { useState } from "react";

const MainTable = ({ data }) => {
  return (
    <div className="">
      <div className="flex text-text font-[600] px-4 mb-5">
        <div className="w-[250px]">
          <h2>Объявления</h2>
        </div>
        <div className="w-[250px]">
          <h2>Период</h2>
        </div>
        <div className="w-[250px]">
          <h2>Дата создания</h2>
        </div>
        <div className="w-[250px]">
          <h2>Статус</h2>
        </div>
      </div>

      {data.map((item) => {
        return (
          <div
            key={item.id}
            className="flex  hover:bg-[#E8EEF4] cursor-pointer px-4 py-3 rounded-xl"
          >
            <div className="flex w-[250px] gap-[10px] items-center">
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
            <div className="flex flex-col w-[250px]">
              <h4 className="text-text texty-[14px] font-[500]">
                {item.period}
              </h4>
              <p className="text-[#B3C6D9] ">
                {item.flyCity}-{item.visitCity}
              </p>
            </div>
            <div className="flex w-[250px] items-center">
              <h2 className="text-text">{item.createdAt}</h2>
            </div>
            <div className="flex w-[250px] items-center">
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
            <div className="flex w-[250px] gap-[15px]">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
              <button>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.39686 15.0963C2.43515 14.7517 2.45429 14.5794 2.50642 14.4184C2.55268 14.2755 2.61802 14.1396 2.70069 14.0142C2.79388 13.8729 2.91645 13.7503 3.1616 13.5052L14.1669 2.49992C15.0873 1.57945 16.5797 1.57945 17.5002 2.49993C18.4207 3.4204 18.4207 4.91279 17.5002 5.83326L6.49493 16.8385C6.24978 17.0836 6.12721 17.2062 5.9859 17.2994C5.86054 17.3821 5.72457 17.4474 5.5817 17.4937C5.42067 17.5458 5.24838 17.5649 4.9038 17.6032L2.0835 17.9166L2.39686 15.0963Z"
                    stroke="#475467"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default MainTable;
