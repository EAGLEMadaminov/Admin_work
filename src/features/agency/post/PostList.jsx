import React from "react";

const PostList = ({ data }) => {
  return (
    <div className="">
      {data.map((item) => {
        return (
          <div key={item.id} className="flex my-5 justify-between">
            <div className="flex justify-between w-[75%]">
              <div className="flex">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-[200px] h-[145px] rounded-xl"
                />
                <div className="ml-2 flex flex-col py-3 justify-between">
                  <div>
                    <p className="text-[#6941C6] text-[14px]">
                      {item.description}
                    </p>
                    <h2 className="text-[#101828] text-[18px] font-[500]">
                      {item.title}
                    </h2>
                  </div>

                  <div className="flex gap-5 ">
                    {item.options.map((one, idx) => {
                      return (
                        <div className="flex gap-3 " key={idx}>
                          <img src={one.icon} alt="" />
                          <p key={one.id}> {one.name}</p>
                        </div>
                      );
                    })}
                    <p>{item.createdAt}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[#101828] text-[20px] font-[600]">
                  ${item.price}{" "}
                  <span className="text-[#475467] font-[400] text-[16px]">
                    AUD total
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex justify-between">
        <button className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-arrow-left-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
            />
          </svg>
          Previos
        </button>
        <div>
          <button className="px-4 ">1</button>
          <button className="px-4 ">2</button>
          <button className="px-4 ">3</button>
          <button className="px-4 ">4</button>
        </div>
        <button className="flex items-center">
          Next{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-arrow-right-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PostList;
