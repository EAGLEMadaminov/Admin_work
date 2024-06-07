import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosIsntance from 'src/utils/lib/axios';
import CustomDropdown from 'src/components/CustimDropdown';
import { agencies } from 'src/utils/util/fakeData';
import MainTable from 'src/components/MainTable';

const AgebcyListPage = () => {
  let token = localStorage.getItem('access_token');
  const [packages, setPackages] = useState(agencies);
  const navigate = useNavigate();

  useEffect(() => {
    (async function getAgency() {
      try {
        let { data } = await axiosIsntance.get('/admin/agency/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data) {
          console.log(data);
          navigate('/dashboard/agency');
        } else {
          navigate('/auth/sign-up');
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token]);

  return (
    <div className="bg-[white] h-[100vh] w-[calc(100vw-300px)]">
      <div className="body   p-7">
        {packages.length > 0 ? (
          <div>
            <div className="flex w-full justify-between ">
              <div className="flex gap-[10px] items-center">
                <button className="text-[#FF9B06]">
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
                </button>
                <p className="text-[#B3C6D9]">Выбрать</p>
              </div>
              <button
                onClick={() => navigate('/dashboard/agency/posts/add')}
                className="bg-[#004280] p-2 px-[15px] text-white rounded-[10px] text-[14px]"
              >
                Добавить объявление
              </button>
            </div>
            <div className="bg-[#00428008] p-5 rounded-[15px] mt-[20px]">
              <MainTable data={packages} />
              <div className="pagenation mt-5 font-[500] flex justify-between">
                <button className="py-2 px-[14px] text-[#344054] rounded-[8px] bg-white border">
                  Предыдущая
                </button>
                <p className="text-[14px] font-[500]">
                  Страница <span>1</span> из <span>3</span>
                </p>
                <button className="py-2 px-[14px]  rounded-[8px] bg-white border">
                  Следующая
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <button className="p-2 rounded-[10px] items-center bg-[#EDF2F6] text-text flex gap-[10px]">
              Добавить объявление{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgebcyListPage;
