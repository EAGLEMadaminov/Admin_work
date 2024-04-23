import React, { useEffect, useState } from "react";
import { styles } from "./style";
import PostList from "src/features/agency/post/PostList";
import { posts } from "src/utils/util/fakeData";
import { Link } from "react-router-dom";
import axiosIsntance from "src/utils/lib/axios";

const AgebcyListPage = () => {
  const [postsList, setPostsList] = useState([]);
  let token = localStorage.getItem("access_token");

  useEffect(() => {
    (async function getAllPosts() {
      try {
        let { data } = await axiosIsntance.get("/admin/agency/packages/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data) {
          setPostsList(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token]);

  return (
    <div className="w-[80%] px-10">
      <h2 className="text-main text-[30px] font-[600]">My posts</h2>
      <div className={`${styles.flexCenter} my-5 justify-between`}>
        <div className={`${styles.flexCenter} justify-between   pl-2 w-[80%]`}>
          <div className="flex border-[#222] border w-full pl-4 rounded-lg">
            <input
              type="search "
              placeholder="Search"
              className="w-full outline-none"
            />
            <button className="border flex items-center rounded-lg ml-3 bg-[#7F56D9] text-white px-5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-search my-3 mr-1"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>{" "}
              Search
            </button>
          </div>
        </div>
      </div>
      <div className={`${styles.flexCenter} justify-end w-[80%]`}>
        <div className="border border-[#222] rounded-lg px-4 py-2 flex gap-4">
          <button>Sort by date</button>
          <button>Sort by price</button>
        </div>
        <button className="border  rounded-lg ml-3 bg-[#6d44c5] text-white py-2 px-3">
          <Link
            to="/dashboard/agency/posts/add"
            className="flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            Create
          </Link>
        </button>
      </div>
      <div>
        <PostList data={posts} />
      </div>
    </div>
  );
};

export default AgebcyListPage;
