import axiosIsntance from "src/utils/lib/axios";
import React, { useState, useEffect } from "react";
import NotificationList from "src/features/agency/notification/NotificationList";
import { posts } from "src/utils/util/fakeData";
const Notification = () => {
  const [infos, setInfos] = useState([1, 2, 3]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    (async function getNotifications() {
      try {
        let { data } = await axiosIsntance.get(
          "/admin/agency/packages/create/notify/",
          {
            headers: {
              Authorization: `Beare ${token}`,
            },
          }
        );
        if (data) {
          setInfos(data);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
  return (
    <div className="w-[70%] ">
      <h1 className="text-2xl font-semibold text-center ">Bildirishnomalar</h1>
      {infos.length > 0 ? (
        <NotificationList data={posts} />
      ) : (
        <h1>Siz hozzircha bildirish nomalar yo&apos;q</h1>
      )}
    </div>
  );
};

export default Notification;
