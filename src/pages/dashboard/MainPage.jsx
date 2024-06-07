import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { addDays, format } from 'date-fns';
import DashboardTable from 'src/components/DashboardTable';

const MainPage = () => {
  const [activeDate, setActiveDate] = useState('month');
  const [date, setDate] = useState({
    from: new Date(Date.now()),
    to: addDays(Date.now(), 4),
  });
  const handleDatePicker = (e) => {
    setDate({ from: new Date(e[0]), to: new Date(e[1]) });
  };
  return (
    <div className="">
      <div className="flex justify-between my-5 pr-5">
        <div className="flex bg-[#F7F9FB] border px-6 w-[65%] rounded-[32px] justify-around text-[14px] font-[500] text-text">
          <button
            onClick={() => setActiveDate('day')}
            className={`py-2 px-6 rounded-[32px] ${activeDate == 'day' ? 'bg-text text-white' : ''} hover:bg-text hover:text-white`}
          >
            Сегодня
          </button>
          <button
            onClick={() => setActiveDate('week')}
            className={`py-2 px-6 rounded-[32px] ${activeDate == 'week' ? 'bg-text text-white' : ''} hover:bg-text hover:text-white `}
          >
            Неделя
          </button>
          <button
            onClick={() => setActiveDate('month')}
            className={`py-2 px-6 rounded-[32px] ${activeDate == 'month' ? 'bg-text text-white' : ''} hover:bg-text hover:text-white `}
          >
            Месяц
          </button>
          <button
            onClick={() => setActiveDate('year')}
            className={`py-2 w-[70px] px-6 ${activeDate == 'year' ? 'bg-text text-white' : ''} text-center rounded-[32px] hover:bg-text hover:text-white `}
          >
            Год
          </button>
        </div>
        <div className="bg-[#F7F9FB] flex justify-center items-center rounded-[32px] border w-[30%]">
          <div className="flex relative gap-2">
            <div className="flex w-full items-center gap-3">
              <svg
                width="19"
                height="21"
                viewBox="0 0 19 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.73512 0C4.14933 0 4.48512 0.335786 4.48512 0.75V1.63928H13.8125V0.75C13.8125 0.335786 14.1483 0 14.5625 0C14.9767 0 15.3125 0.335786 15.3125 0.75V1.68118C17.1167 1.95258 18.5 3.50939 18.5 5.38928L18.5 16.875C18.5 18.9461 16.8211 20.625 14.75 20.625H3.75C1.67893 20.625 0 18.9461 0 16.875V5.38928C0 3.58032 1.28086 2.07052 2.98512 1.71734V0.75C2.98512 0.335786 3.32091 0 3.73512 0ZM3.7251 3.13941C2.49393 3.15276 1.5 4.15495 1.5 5.38928V16.875C1.5 18.1176 2.50736 19.125 3.75 19.125H14.75C15.9926 19.125 17 18.1176 17 16.875L17 5.38928C17 4.14664 15.9926 3.13928 14.75 3.13928H3.75264C3.74681 3.13941 3.74097 3.13948 3.73512 3.13948C3.73177 3.13948 3.72843 3.13946 3.7251 3.13941ZM3.64286 6.21426C3.64286 5.80004 3.97864 5.46426 4.39286 5.46426H14.0312C14.4455 5.46426 14.7812 5.80004 14.7812 6.21426C14.7812 6.62847 14.4455 6.96426 14.0312 6.96426H4.39286C3.97864 6.96426 3.64286 6.62847 3.64286 6.21426Z"
                  fill="#004280"
                />
              </svg>
              <p className="text-text text-[14px] font-[500]">
                {format(date.from, `dd.LLLL.yyyy`)}
              </p>
            </div>
            <DateRangePicker
              className="absolute w-full h-[100%]  opacity-0 "
              onChange={handleDatePicker}
            />
            <span className="ml-3 flex items-center text-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-dash-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8"
                />
              </svg>
            </span>
            <div className="flex w-full items-center gap-5 ">
              <svg
                width="19"
                height="21"
                viewBox="0 0 19 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-3"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.73512 0C4.14933 0 4.48512 0.335786 4.48512 0.75V1.63928H13.8125V0.75C13.8125 0.335786 14.1483 0 14.5625 0C14.9767 0 15.3125 0.335786 15.3125 0.75V1.68118C17.1167 1.95258 18.5 3.50939 18.5 5.38928L18.5 16.875C18.5 18.9461 16.8211 20.625 14.75 20.625H3.75C1.67893 20.625 0 18.9461 0 16.875V5.38928C0 3.58032 1.28086 2.07052 2.98512 1.71734V0.75C2.98512 0.335786 3.32091 0 3.73512 0ZM3.7251 3.13941C2.49393 3.15276 1.5 4.15495 1.5 5.38928V16.875C1.5 18.1176 2.50736 19.125 3.75 19.125H14.75C15.9926 19.125 17 18.1176 17 16.875L17 5.38928C17 4.14664 15.9926 3.13928 14.75 3.13928H3.75264C3.74681 3.13941 3.74097 3.13948 3.73512 3.13948C3.73177 3.13948 3.72843 3.13946 3.7251 3.13941ZM3.64286 6.21426C3.64286 5.80004 3.97864 5.46426 4.39286 5.46426H14.0312C14.4455 5.46426 14.7812 5.80004 14.7812 6.21426C14.7812 6.62847 14.4455 6.96426 14.0312 6.96426H4.39286C3.97864 6.96426 3.64286 6.62847 3.64286 6.21426Z"
                  fill="#004280"
                />
              </svg>
              <p className="text-[14px] text-text font-[500]">
                {format(date.to, `dd.LLLL.yyyy`)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mr-5">
        <div className="w-[250px] flex flex-col justify-between h-[160px] border rounded-[15px] bg-[#F7F9FB] p-3">
          <div className="flex justify-between">
            <div>
              <p className="text-[#898D90] font-[600]">Просмотры</p>
              <h2 className="text-[28px] font-[700] text-text">40,689</h2>
            </div>
            <div className="w-11 h-11 rounded-[12px] flex justify-center items-center bg-[#DEE0FC]">
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.587821"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.15576 4.11131C5.15576 6.27135 6.90683 8.02242 9.06687 8.02242C11.2269 8.02242 12.978 6.27135 12.978 4.11131C12.978 1.95126 11.2269 0.200195 9.06687 0.200195C6.90683 0.200195 5.15576 1.95126 5.15576 4.11131ZM14.9332 8.02191C14.9332 9.64195 16.2465 10.9552 17.8666 10.9552C19.4866 10.9552 20.7999 9.64195 20.7999 8.02191C20.7999 6.40188 19.4866 5.08858 17.8666 5.08858C16.2465 5.08858 14.9332 6.40188 14.9332 8.02191Z"
                  fill="#8280FF"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.0508 9.97803C4.43429 9.97803 0.64672 12.3506 0.267727 17.0173C0.247083 17.2714 0.733208 17.8002 0.978425 17.8002H17.1305C17.8651 17.8002 17.8765 17.2092 17.8651 17.018C17.5785 12.2203 13.7323 9.97803 9.0508 9.97803ZM17.4766 11.9339C18.7039 13.5679 19.4312 15.599 19.4312 17.7999H23.2008C23.7313 17.7999 23.7395 17.3566 23.7313 17.2133C23.5266 13.6545 20.8072 11.9704 17.4766 11.9339Z"
                  fill="#8280FF"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0283 0L17.4655 2.29L12.2718 7.17L8.01472 3.17L0.128418 10.59L1.62905 12L8.01472 6L12.2718 10L18.9768 3.71L21.414 6V0H15.0283Z"
                  fill="#00B69B"
                />
              </svg>
            </span>
            <p className="text-[14px] text-[#606060] leading-[17px] font-[500]">
              <span className="text-[#00B69B]">8.5%</span> По сравнению с
              предыдущим месяцем
            </p>
          </div>
        </div>
        <div className="w-[250px] flex flex-col justify-between h-[160px] border rounded-[15px] bg-[#F7F9FB] p-3">
          <div className="flex justify-between">
            <div>
              <p className="text-[#898D90] font-[600]">Заявки</p>
              <h2 className="text-[28px] font-[700] text-text">10293</h2>
            </div>
            <div className="w-11 h-11  flex justify-center items-center rounded-[12px] bg-[#F8EED3] ">
              <svg
                width="22"
                height="26"
                viewBox="0 0 22 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 8.83239L9.46036 14.2943C9.56223 14.3531 9.66904 14.3956 9.77778 14.4226V25.0158L0.674714 19.6286C0.256508 19.3811 0 18.9312 0 18.4452V8.83239ZM22.0002 8.68701V18.4451C22.0002 18.931 21.7437 19.3809 21.3255 19.6284L12.2225 25.0156V14.3296C12.2446 14.3185 12.2666 14.3067 12.2884 14.2942L22.0002 8.68701Z"
                  fill="#FEC53D"
                />
                <path
                  opacity="0.499209"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.297363 6.18091C0.412918 6.03499 0.558769 5.91166 0.728814 5.82109L10.3538 0.694609C10.7579 0.479401 11.2425 0.479401 11.6466 0.694609L21.2716 5.82109C21.4027 5.89091 21.5194 5.98019 21.6189 6.08429L11.0661 12.1769C10.9967 12.217 10.9328 12.2628 10.8745 12.3135C10.8161 12.2628 10.7522 12.217 10.6828 12.1769L0.297363 6.18091Z"
                  fill="#FEC53D"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0283 0L17.4655 2.29L12.2718 7.17L8.01472 3.17L0.128418 10.59L1.62905 12L8.01472 6L12.2718 10L18.9768 3.71L21.414 6V0H15.0283Z"
                  fill="#00B69B"
                />
              </svg>
            </span>
            <p className="text-[14px] text-[#606060] leading-[17px] font-[500]">
              <span className="text-[#00B69B]">8.5%</span> По сравнению с
              предыдущим месяцем
            </p>
          </div>
        </div>
        <div className="w-[250px] flex flex-col pb-5 justify-between h-[160px] border rounded-[15px] bg-[#F7F9FB] p-3">
          <div className="flex justify-between">
            <div>
              <p className="text-[#898D90] font-[600]">Мои объявления </p>
              <h2 className="text-[28px] font-[700] text-text">12</h2>
            </div>
            <div className="w-11 h-11 rounded-[12px] flex justify-center items-center bg-[#D3F2E5]">
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5112 18.9852H19.4336C20.0567 18.9852 20.5617 19.496 20.5617 20.126C20.5617 20.756 20.0567 21.2667 19.4336 21.2667H1.38304C0.759977 21.2667 0.254883 20.756 0.254883 20.126V1.87414C0.254883 1.24413 0.759977 0.733398 1.38304 0.733398C2.00611 0.733398 2.5112 1.24413 2.5112 1.87414V18.9852Z"
                  fill="#4AD991"
                />
                <path
                  opacity="0.5"
                  d="M6.71877 14.0614C6.29264 14.521 5.5787 14.5443 5.12415 14.1134C4.6696 13.6825 4.64657 12.9606 5.07271 12.501L9.3033 7.93803C9.71543 7.49352 10.4003 7.45497 10.8586 7.85048L14.1977 10.7316L18.5482 5.15952C18.9343 4.66503 19.6437 4.58064 20.1327 4.97103C20.6217 5.36141 20.7052 6.07874 20.3191 6.57323L15.2424 13.0754C14.8459 13.5833 14.1114 13.6564 13.6246 13.2363L10.213 10.2926L6.71877 14.0614Z"
                  fill="#4AD991"
                />
              </svg>
            </div>
          </div>
          <p className="text-[14px] text-[#606060] leading-[17px] font-[500]">
            <span className="text-[#00B69B]">23</span> Общее объявлений
          </p>
        </div>
        <div className="w-[250px] h-[160px] border rounded-[15px] bg-text flex justify-center items-center p-5 text-white">
          <div className="flex items-center">
            <span className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-plus-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                />
              </svg>
            </span>
            <p className="text-[14px] font-[600] w-[100px] leading-5 ml-2">
              Добавить объявление
            </p>
          </div>
        </div>
      </div>
      <DashboardTable />
    </div>
  );
};

export default MainPage;
