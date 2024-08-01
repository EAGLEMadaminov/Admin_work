import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewPost = () => {
  const [array, setArray] = useState([
    { id: 1, src: '', islast: false },
    { id: 2, src: '', islast: false },
    { id: 3, src: '', islast: false },
    { id: 4, src: '', islast: false },
    { id: 5, src: '', islast: false },
    { id: 6, src: '', islast: false },
    { id: 7, src: '', islast: false },
    { id: 8, src: '', islast: false },
  ]);
  const navigate = useNavigate();
  return (
    <>
      <div className="space-y-8 w-[600px]  mt-5">
        <div className="ml-5">
          <h4 className="text-[18px] font-[600] mb-3 text-text">
            Детальная информация
          </h4>
          <h2 className="text-[14px] font-[500] text-text">Название пакета</h2>
          <p className="border bg-[#EDF2F6]   w-full p-2 mt-1 mb-5 rounded-lg border-[#D1DCE5]">
            Umra safari
          </p>

          <div className="flex justify-between gap-[20px]">
            <div className="relative w-full">
              <h2 className="font-[500] text-[14px] text-text">Страна</h2>
              <p className="border bg-[#EDF2F6] placeholder:text-[#0042804D]  w-full p-2 mt-1 mb-5 rounded-lg border-[#D1DCE5]">
                Saudy araby
              </p>
            </div>
            <div className="relative w-full">
              <h2 className="font-[500] text-[14px] text-text">Город</h2>
              <p className="border bg-[#EDF2F6]   w-full p-2 mt-1 mb-5 rounded-lg border-[#D1DCE5]">
                Mecca
              </p>
            </div>
          </div>

          <div className="relative">
            <h2 className="font-[500] text-[14px] text-text">Город отъезда</h2>
            <p className="border bg-[#EDF2F6] placeholder:text-[#0042804D]  w-full p-2 mt-1 mb-5 rounded-lg border-[#D1DCE5]">
              Tashkent
            </p>
          </div>

          <h2 className="text-[14px] font-[500] text-text">
            Укажите дату поездки
          </h2>
          <div className="relative  mt-3 mb-3">
            <div className="flex gap-14 text-[14px] font-[500] text-[#B3C6D9]">
              <p>Дата вылета</p>
              <p className="ml-[175px]">Дата пребывания</p>
            </div>
            <div className="flex gap-5 mt-4">
              <div className="flex w-full items-center gap-5 px-3 border border-[#D1DCE5] rounded-lg p-2 bg-[#EDF2F6]">
                <p>01.10.2024</p>
              </div>

              <div className="flex w-full items-center gap-5 px-3 ml-2 border border-[#D1DCE5] rounded-lg p-2 bg-[#EDF2F6]">
                <p>10.10.2024</p>
              </div>
            </div>
          </div>

          <div className="mt-5 mb-5 flex justify-between ">
            <div className="flex w-[60%] flex-col">
              <h2 className="font-[500] text-[14px] text-text">Цена</h2>
              <p className="outline-none  mt-3 bg-[#EDF2F6]  w-full border border-[#D1DCE5] p-2 rounded-lg">
                300
              </p>
            </div>

            <div>
              <h2 className="font-[500] text-[14px] text-text mb-3">Валюта</h2>

              <button
                className={`py-3 w-[80px] px-[10px] bg-text text-white  rounded-lg text-[14px] font-[500]`}
              >
                Y.e
              </button>
            </div>
          </div>
          <h3 className="text-[18px] text-text font-semibold my-3">
            Включает в себя
          </h3>
          <div className="flex flex-col gap-3">
            <p>Гид</p>
            <p>ticket</p>
            <>insurance</>
          </div>

          <div className="lg:w-[850px]">
            <div className="flex justify-between items-center my-5">
              <h2 className="text-[18px] text-text font-[600]">Фото</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {array.map((item) => {
                return (
                  <div
                    className={`w-[200px] h-[170px] gap-3 flex item-center mx-auto justify-center flex-col text-center ${'bg-[#F2F4F5]'}`}
                    key={item.id}
                  >
                    <img
                      src={item.src}
                      className="w-[180px] h-[150px] object-cover "
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            onClick={() => navigate('/dashboard/agency/posts/edit/1')}
            className="bg-text mt-5 flex items-center text-white py-[10px] px-4 rounded-lg"
          >
            Изменить
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewPost;
