import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosIsntance from 'src/utils/lib/axios';
import { addDays, format } from 'date-fns';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import CustomCheckBox from 'src/components/CustomCheckBox';
import HotelForm from 'src/components/HotelForm';
const PostForm = () => {
  const [countryList, setCountryList] = useState([]);
  const [showCountries, setShowCountries] = useState(false);
  const [choosenCountry, setChoosenCountry] = useState('');
  const [cityList, setCityList] = useState([]);
  const [showCities, setShowCities] = useState(false);
  const [choosenCity, setChoosenCity] = useState('');
  const [cityFly, setCityFly] = useState('');
  const [showCityFly, setShowCityFly] = useState(false);
  const [flyCityList, setFlyCityList] = useState([]);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [showDate, setShowDate] = useState(false);
  const [currency, setCurrency] = useState('yevro');
  const [selectAllMeals, setSelectAllMeals] = useState(false);
  let token = localStorage.getItem('access_token');
  const [formInfo, setFormInfo] = useState({ hotelForm: {}, all: {} });
  const [date, setDate] = useState({
    from: new Date(Date.now()),
    to: addDays(Date.now(), 4),
  });

  const { register, handleSubmit, control } = useForm();

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

  const handleImageChange = async (e, id) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      let { data: imageId } = await axiosIsntance.post(
        '/image-upload/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (imageId && imageId.image) {
        setImages([...images, imageId.image]);
      }
    } catch (error) {
      console.log(error);
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newArray = array.map((item) => {
          if (item.id === id) {
            return { ...item, src: reader.result };
          }
          return item;
        });
        setArray(newArray);
      };
      reader.readAsDataURL(file);
    }
  };

  const searchFunction = async (value) => {
    try {
      let { data } = await axiosIsntance.get(value);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchCountryBtn = async (e) => {
    setChoosenCountry(e.target.value);
    const value = `/country/?country=${e.target.value}`;
    const result = await searchFunction(value);
    if (result) {
      setShowCountries(true);
      setCountryList(result.country_list);
    }
  };

  const handleChooseCity = async (e) => {
    setChoosenCity(e.target.value);
    const value = `/city/?country=${choosenCountry}&city=${e.target.value}`;
    const res = await searchFunction(value);
    if (res) {
      console.log(res);
      setShowCities(true);
      setCityList(res.city_list);
    }
  };

  const handleFlyCityBtn = async (e) => {
    setCityFly(e.target.value);
    const value = `/city/?country=Uzbekistan&city=${e.target.value}`;
    const res = await searchFunction(value);
    if (res) {
      setShowCityFly(true);

      setFlyCityList(res.city_list);
    }
  };

  const handleDatePicker = (e) => {
    setShowDate(true);
    setDate({ from: new Date(e[0]), to: new Date(e[1]) });
  };

  const handleFormSubmit = async (data) => {
    data.starting_date = format(date.from, 'yyyy-MM-dd');
    data.ending_date = format(date.to, 'yyyy-MM-dd');
    data.images = images;
    data.city_to = choosenCity.id;
    data.city_from = cityFly.id;
    console.log(data);
    console.log(data);
    try {
      let { data: agency } = await axiosIsntance.post(
        '/admin/agency/packages/create/',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (agency) {
        navigate('/dashboard/agency/posts');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (e) => {
    setSelectAllMeals(e.target.checked);
  };

  const handleHotelSubmit = (data) => {
    setFormInfo((...prevState) => ({
      ...prevState,
      hotel: data,
    }));
    console.log(data);
  };
  return (
    <>
      <form
        className="space-y-8 w-[600px]  mt-5"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="ml-5">
          <h4 className="text-[18px] font-[600] mb-3 text-text">
            Детальная информация
          </h4>
          <div className="flex justify-between">
            <label
              htmlFor="tour_name"
              className="text-[14px] font-[500] text-text"
            >
              Укажите название пакета<span className="text-[#fa0000]">*</span>
            </label>
            <span className="text-[14px] font-[500] text-[#0042804D]">
              0/45
            </span>
          </div>
          <input
            id="tour_name"
            placeholder="Введите название"
            {...register('title', { required: true })}
            required
            className="border bg-[#EDF2F6] placeholder:text-[#0042804D]  w-full p-2 mt-1 mb-5 rounded-lg border-[#D1DCE5]"
          />

          <div className="flex justify-between gap-[20px]">
            <div className="relative w-full">
              <label
                htmlFor="country"
                className="font-[500] text-[14px] text-text"
              >
                Страна<span className="text-[#fa0000]">*</span>
              </label>
              <input
                type="search"
                id="country"
                placeholder="Выберите страну"
                {...register('country', { required: true })}
                className="border bg-[#EDF2F6] placeholder:text-[#0042804D]  w-full p-2 mt-1 mb-5 rounded-lg border-[#D1DCE5]"
                value={choosenCountry}
                required
                onChange={handleSearchCountryBtn}
              />

              {countryList.length > 0 && showCountries ? (
                <ul className="border z-20 bg-white absolute p-2 w-full rounded-lg shadow-2xl top-[70px] border-[#000]">
                  {countryList.map((item, index) => {
                    return (
                      <li
                        onClick={() => {
                          setChoosenCountry(item);
                          setShowCountries(false);
                        }}
                        key={index}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                ''
              )}
            </div>
            <div className="relative w-full">
              <label
                htmlFor="city"
                className="font-[500] text-[14px] text-text"
              >
                Город<span className="text-[#fa0000]">*</span>
              </label>
              <input
                type="search"
                id="city"
                {...register('city_to', { required: true })}
                // ref={city1Ref}
                className="border bg-[#EDF2F6]  placeholder:text-[#0042804D]  w-full p-2 mt-1 mb-5 rounded-lg border-[#D1DCE5]"
                placeholder="Выберите город"
                onChange={handleChooseCity}
                value={choosenCity.name}
              />

              {cityList.length > 0 && showCities ? (
                <ul className="absolute  z-20 shadow-2xl border border-[#000] w-full p-2 rounded-lg top-[70px] bg-white">
                  {cityList.map((city, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          setChoosenCity(city);
                          setShowCities(false);
                          // city2Ref.current.focus();
                        }}
                      >
                        {city.name}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="fly_city"
              className="font-[500] text-[14px] text-text"
            >
              Город отъезда<span className="text-[#fa0000]">*</span>
            </label>
            <input
              id="fly_city"
              className="border bg-[#EDF2F6] placeholder:text-[#0042804D]  w-full p-2 mt-1 mb-5 rounded-lg border-[#D1DCE5]"
              placeholder="Выберите город"
              // ref={city2Ref}
              {...register('city_from', { required: true })}
              onChange={handleFlyCityBtn}
              value={cityFly.name}
            />

            {flyCityList.length > 0 && showCityFly ? (
              <ul className="absolute z-20 shadow-2xl border border-[#000] w-full p-2 rounded-lg  top-[70px] bg-white">
                {flyCityList.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setCityFly(item);
                        setShowCityFly(false);
                      }}
                    >
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            ) : (
              ''
            )}
          </div>
          <h2 className="text-[14px] font-[500] text-text">
            Укажите дату поездки<span className="text-[#fa0000]">*</span>
          </h2>
          <div className="relative  mt-3 mb-3">
            <div className="flex gap-14 text-[14px] font-[500] text-[#B3C6D9]">
              <p>Дата вылета</p>
              <p className="ml-[175px]">Дата пребывания</p>
            </div>
            <div className="flex gap-5 mt-4">
              <div className="flex w-full items-center gap-5 px-3 border border-[#D1DCE5] rounded-lg p-2 bg-[#EDF2F6]">
                {showDate ? (
                  <p>
                    <span className="tracking-[2px]">
                      {format(date.from, `dd | LLLL | yyyy`)}
                    </span>
                  </p>
                ) : (
                  <p className="flex gap-[15px] text-[#0042804D] text-[14px] font-[500]">
                    День <span className="ml-2">|</span> Месяц{' '}
                    <span className="ml-2">|</span> Год
                  </p>
                )}

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
              </div>
              <DateRangePicker
                className="absolute w-full h-[100%]  opacity-0 "
                onChange={handleDatePicker}
              />
              <div className="flex w-full items-center gap-5 px-3 ml-2 border border-[#D1DCE5] rounded-lg p-2 bg-[#EDF2F6]">
                {showDate ? (
                  <p>
                    <span className="tracking-[2px]">
                      {format(date.to, `dd | LLLL | yyyy`)}
                    </span>
                  </p>
                ) : (
                  <p className="flex gap-[15px] text-[#0042804D] text-[14px] font-[500]">
                    День <span className="ml-2">|</span> Месяц{' '}
                    <span className="ml-2">|</span> Год
                  </p>
                )}

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
              </div>
            </div>
          </div>

          <div className="mt-5 mb-5 flex justify-between ">
            <div className="flex w-[60%] flex-col">
              <label
                htmlFor="tour_price"
                className="font-[500] text-[14px] text-text"
              >
                Цена<span className="text-[#fa0000]">*</span>
              </label>
              <input
                placeholder="1,600,000"
                className="outline-none  mt-3 bg-[#EDF2F6]  w-full border border-[#D1DCE5] p-2 rounded-lg"
                type="number"
                {...register('price', { required: true })}
                id="tour_price"
              />
            </div>

            <div>
              <h2 className="font-[500] text-[14px] text-text mb-3">Валюта</h2>
              <button
                onClick={() => setCurrency('sum')}
                type="button"
                className={`py-3 w-[80px] px-[10px] ${currency === 'sum' ? 'bg-text text-white' : 'bg-[#EDF2F6] text-[#0042804D]'}  rounded-lg  text-[14px] font-[500]`}
              >
                Сум
              </button>
              <button
                type="button"
                onClick={() => setCurrency('yevro')}
                className={`py-3 w-[80px] ml-3 px-[10px] ${currency === 'yevro' ? 'bg-text text-white' : 'bg-[#EDF2F6] text-[#0042804D]'} rounded-lg text-[14px] font-[500]`}
              >
                Y.e
              </button>
            </div>
          </div>
          <h3 className="text-[18px] text-text font-semibold my-3">
            Включает в себя
          </h3>
          <div className="flex flex-col gap-3">
            <Controller
              name="git"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <CustomCheckBox
                  checked={field.value}
                  onChange={field.onChange}
                  label="Гид"
                />
              )}
            />
            <Controller
              name="ticket"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <CustomCheckBox
                  checked={field.value}
                  onChange={field.onChange}
                  label="Авиабилеты"
                />
              )}
            />
            <Controller
              name="insurance"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <CustomCheckBox
                  checked={field.value}
                  onChange={field.onChange}
                  label="Страховка"
                />
              )}
            />
          </div>

          <HotelForm onSubmit={handleHotelSubmit} />
          <div className="lg:w-[850px]">
            <div className="flex justify-between items-center my-5">
              <h2 className="text-[18px] text-text font-[600]">Фото</h2>
              <p className="text-[14px] font-[500] text-text flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.97279 0.0038955C10.5381 -1.07519e-05 10.8539 0.0195205 11.2749 0.0820205C11.5829 0.124989 12.0235 0.203114 12.2613 0.257802C12.4952 0.308583 12.928 0.433583 13.2165 0.531239C13.5049 0.628896 14.0391 0.855458 14.4055 1.03515C14.7681 1.21093 15.2593 1.48827 15.4972 1.64452C15.7311 1.80077 16.0742 2.05077 16.2574 2.1953C16.4406 2.34374 16.7876 2.66015 17.0293 2.90233C17.2749 3.14061 17.6024 3.49608 17.7584 3.6914C17.9143 3.8828 18.1794 4.24608 18.3432 4.49218C18.5108 4.73827 18.7915 5.23827 18.9708 5.60546C19.1619 5.99999 19.3724 6.5078 19.4894 6.85546C19.5946 7.17968 19.7272 7.66015 19.7818 7.92968C19.8363 8.19921 19.9065 8.6289 19.9416 8.88671C19.9728 9.14452 20.0001 9.63671 20.0001 9.98046C20.0001 10.3242 19.9728 10.8242 19.9416 11.0937C19.9065 11.3633 19.8363 11.8008 19.7818 12.0703C19.7272 12.3398 19.5946 12.8242 19.4894 13.1445C19.3724 13.4922 19.1619 14 18.9708 14.3945C18.7915 14.7578 18.5108 15.2617 18.3432 15.5078C18.1794 15.7539 17.9143 16.1133 17.7584 16.3086C17.6024 16.5 17.2749 16.8594 17.0293 17.0976C16.7876 17.3398 16.4406 17.6562 16.2574 17.8047C16.0742 17.9492 15.7311 18.1992 15.4972 18.3555C15.2593 18.5117 14.7681 18.7891 14.4055 18.9648C14.0391 19.1445 13.5049 19.3711 13.2165 19.4687C12.928 19.5664 12.4952 19.6914 12.2613 19.7422C12.0235 19.7969 11.5829 19.875 11.2749 19.918C10.8812 19.9766 10.5225 20 10.0196 20C9.51665 20 9.15797 19.9766 8.76031 19.918C8.45622 19.875 8.01177 19.7969 7.77785 19.7422C7.54004 19.6914 7.11119 19.5664 6.82269 19.4687C6.53419 19.3711 5.99618 19.1445 5.6336 18.9648C5.26713 18.7891 4.7759 18.5117 4.54199 18.3555C4.30417 18.1992 3.96499 17.9492 3.78175 17.8047C3.59852 17.6562 3.25154 17.3398 3.00982 17.0976C2.76421 16.8594 2.43672 16.5 2.28078 16.3086C2.12483 16.1133 1.85973 15.7539 1.69598 15.5078C1.52834 15.2617 1.24764 14.7578 1.0683 14.3945C0.877269 14 0.666743 13.4922 0.549784 13.1445C0.444521 12.8203 0.311967 12.3398 0.257386 12.0703C0.202805 11.8008 0.13263 11.3711 0.097542 11.1133C0.0663529 10.8555 0.0390625 10.3633 0.0390625 10.0195C0.0390625 9.67577 0.0663529 9.17577 0.097542 8.90624C0.13263 8.63671 0.202805 8.19921 0.257386 7.92968C0.311967 7.66015 0.444521 7.17577 0.549784 6.85546C0.666743 6.5078 0.877269 5.99999 1.0683 5.60546C1.24764 5.23827 1.52834 4.73827 1.69598 4.49218C1.85973 4.24608 2.12483 3.8828 2.28078 3.6914C2.43672 3.49608 2.76421 3.14061 3.00982 2.90233C3.25154 2.66015 3.59852 2.34374 3.78175 2.1953C3.96499 2.05077 4.30417 1.80077 4.54199 1.64452C4.7759 1.48827 5.26713 1.21093 5.6336 1.03124C6.03516 0.835927 6.52639 0.628896 6.88117 0.511708C7.20086 0.406239 7.6414 0.281239 7.85583 0.238271C8.07025 0.191396 8.46401 0.121083 8.73302 0.0820205C9.0644 0.0312392 9.45817 0.00780175 9.96889 0.0038955H9.97279ZM8.65895 1.01561C8.4991 1.03905 8.2067 1.09765 8.01567 1.13671C7.82074 1.17968 7.41918 1.29686 7.11898 1.39843C6.81879 1.49608 6.31587 1.70702 5.99618 1.86327C5.68039 2.01952 5.22425 2.28124 4.98253 2.4453C4.74472 2.60936 4.40553 2.85936 4.23399 3.0039C4.06245 3.14843 3.78175 3.40624 3.61411 3.57811C3.44257 3.74608 3.18526 4.02733 3.04101 4.19921C2.89676 4.37108 2.64725 4.71093 2.48351 4.95311C2.31976 5.1914 2.05856 5.64843 1.90261 5.96483C1.74666 6.28515 1.53614 6.78905 1.43867 7.08983C1.33731 7.39061 1.22035 7.79296 1.17746 7.98827C1.13458 8.17968 1.0722 8.53124 1.03321 8.76952C0.986431 9.0703 0.966938 9.4414 0.966938 9.99999C0.966938 10.5586 0.986431 10.9297 1.03321 11.2305C1.0722 11.4648 1.13458 11.8164 1.17746 12.0117C1.22035 12.2031 1.33731 12.6094 1.43867 12.9101C1.53614 13.2109 1.74666 13.7148 1.90261 14.0351C2.05856 14.3516 2.31976 14.8086 2.48351 15.0469C2.64725 15.2891 2.89676 15.6289 3.04101 15.8008C3.18526 15.9726 3.44257 16.2539 3.61411 16.4219C3.78175 16.5937 4.06245 16.8516 4.23399 16.9961C4.40553 17.1406 4.74472 17.3906 4.98253 17.5547C5.22425 17.7187 5.68039 17.9805 5.99618 18.1367C6.31587 18.293 6.81879 18.5039 7.11898 18.6016C7.41918 18.7031 7.82074 18.8203 8.01567 18.8633C8.2067 18.9062 8.55758 18.9687 8.7954 19.0078C9.09559 19.0547 9.46596 19.0742 10.0235 19.0742C10.581 19.0742 10.9513 19.0547 11.2515 19.0078C11.4855 18.9687 11.8363 18.9062 12.0313 18.8633C12.2223 18.8203 12.6278 18.7031 12.928 18.6016C13.2281 18.5039 13.7311 18.293 14.0469 18.1367C14.3665 17.9805 14.8227 17.7187 15.0605 17.5547C15.3022 17.3906 15.6414 17.1406 15.8129 16.9961C15.9845 16.8516 16.2652 16.5937 16.4328 16.4219C16.6044 16.2539 16.8617 15.9726 17.0059 15.8008C17.1502 15.6289 17.3997 15.2891 17.5634 15.0469C17.7272 14.8086 17.9884 14.3516 18.1443 14.0351C18.3003 13.7148 18.5108 13.2109 18.6083 12.9101C18.7096 12.6094 18.8266 12.2031 18.8695 12.0117C18.9124 11.8164 18.9747 11.4648 19.0137 11.2305C19.0605 10.9297 19.08 10.5586 19.08 9.99999C19.08 9.4414 19.0605 9.0703 19.0137 8.76952C18.9747 8.53124 18.9124 8.17968 18.8695 7.98827C18.8266 7.79296 18.7096 7.39061 18.6083 7.08983C18.5108 6.78905 18.3003 6.28515 18.1443 5.96483C17.9884 5.64843 17.7272 5.1914 17.5634 4.95311C17.3997 4.71093 17.1502 4.37108 17.0059 4.19921C16.8617 4.02733 16.6044 3.74608 16.4328 3.57811C16.2652 3.40624 15.9845 3.14843 15.8129 3.0039C15.6414 2.85936 15.3022 2.60936 15.0605 2.4453C14.8227 2.28124 14.3665 2.01952 14.0469 1.86327C13.7311 1.70702 13.2281 1.49608 12.928 1.39843C12.6278 1.29686 12.2223 1.17968 12.0313 1.13671C11.8363 1.09374 11.4972 1.03124 11.271 0.999989C11.0449 0.968739 10.5966 0.933583 10.2769 0.921864C9.95329 0.914052 9.52444 0.917958 9.32171 0.933583C9.11898 0.953114 8.81879 0.98827 8.65895 1.01561ZM11.0761 5.01171C11.2944 5.01952 11.4231 5.04686 11.5829 5.12499C11.6999 5.18358 11.8636 5.29296 11.9416 5.36718C12.0235 5.4453 12.1287 5.58202 12.1716 5.67577C12.2184 5.76561 12.2652 5.9453 12.2769 6.07421C12.2899 6.23046 12.2756 6.37369 12.234 6.5039C12.1989 6.61327 12.1014 6.77733 12.0196 6.87499C11.9338 6.97265 11.7818 7.09765 11.6765 7.15624C11.5712 7.21093 11.3802 7.27733 11.2515 7.30077C11.08 7.33202 10.9552 7.33202 10.7837 7.30077C10.655 7.27733 10.4835 7.22265 10.4016 7.18358C10.3237 7.14452 10.195 7.05077 10.117 6.98436C10.0391 6.91405 9.9299 6.77733 9.87532 6.67968C9.80514 6.55858 9.77006 6.42577 9.75836 6.24999C9.74667 6.10155 9.76226 5.92968 9.78955 5.83983C9.81684 5.7539 9.89481 5.60936 9.96109 5.51952C10.0274 5.42968 10.1599 5.30077 10.2574 5.23436C10.3549 5.17186 10.5108 5.08983 10.6083 5.05858C10.7174 5.02343 10.8929 5.0039 11.0761 5.01171ZM9.96499 8.37499C10.3471 8.3828 10.4211 8.39843 10.6472 8.5039C10.7876 8.5664 10.9591 8.67186 11.0332 8.73436C11.1073 8.79686 11.2048 8.91015 11.2515 8.98437C11.2983 9.05858 11.3607 9.1914 11.388 9.27733C11.4153 9.36327 11.4348 9.58202 11.4309 9.76562C11.4309 9.94921 11.4114 10.1953 11.388 10.3125C11.3646 10.4297 11.2165 10.9844 11.0527 11.543C10.889 12.1016 10.7252 12.7148 10.6823 12.9101C10.6434 13.1016 10.6083 13.3594 10.6083 13.4766C10.6083 13.625 10.6317 13.7305 10.6862 13.8203C10.7291 13.8867 10.8227 13.9766 10.889 14.0156C10.9903 14.0664 11.1034 14.082 11.4075 14.0781C11.6609 14.0742 11.8597 14.0508 11.9728 14.0078C12.0703 13.9726 12.156 13.9531 12.1677 13.9648C12.1794 13.9766 12.1521 14.1055 12.0313 14.5078L11.5244 14.6953C11.2437 14.7969 10.8851 14.9101 10.7252 14.9453C10.5108 14.9922 10.312 15.0078 9.98448 14.9922C9.57902 14.9805 9.51275 14.9648 9.27103 14.8516C9.12678 14.7812 8.92795 14.6484 8.82269 14.5547C8.71742 14.457 8.60046 14.2969 8.54588 14.1758C8.46401 14 8.45232 13.9062 8.45622 13.6133C8.45622 13.418 8.48741 13.1289 8.52249 12.9687C8.55758 12.8086 8.70573 12.2578 8.85388 11.75C9.00592 11.2383 9.16187 10.6601 9.20475 10.4687C9.24764 10.2734 9.28273 10.0195 9.28273 9.90233C9.28273 9.77733 9.25544 9.6328 9.21255 9.55077C9.16967 9.46093 9.09169 9.39061 8.99033 9.34765C8.88507 9.29686 8.75251 9.28124 8.56148 9.28515C8.41333 9.28905 8.17551 9.32811 8.03516 9.37108C7.89481 9.41405 7.77785 9.4453 7.77006 9.4414C7.76616 9.43749 7.78955 9.3203 7.82464 9.17968C7.86362 9.03905 7.91041 8.90624 7.9338 8.8789C7.95719 8.85155 8.2301 8.74218 8.54199 8.63671C8.85388 8.52733 9.20475 8.42186 9.32171 8.40233C9.43867 8.3828 9.72717 8.36718 9.96499 8.37499Z"
                    fill="#FF9B06"
                  />
                </svg>
                Первое фото будет на обложке объявления
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {array.map((item) => {
                return (
                  <div
                    className={`w-[200px] h-[170px] gap-3 flex item-center mx-auto justify-center flex-col text-center ${
                      item.id == 1 && !item.src
                        ? 'bg-[#F9E3C2]'
                        : 'bg-[#F2F4F5]'
                    }`}
                    key={item.id}
                  >
                    <input
                      type="file"
                      className="opacity-0 absolute  h-[200px]"
                      onChange={(e) => handleImageChange(e, item.id)}
                      accept="image/png, image/jpg, image/jpeg, image/webp, image/heic"
                    />
                    {item.src ? (
                      <img
                        src={item.src}
                        className="w-[180px] h-[150px] object-cover "
                      />
                    ) : item.id == 1 ? (
                      <p className="underline text-text text-[18px] font-[600]">
                        Добавить Фото{' '}
                      </p>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-camera mx-auto inline"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="bg-text mt-5 text-white py-[10px] px-4 rounded-lg"
          >
            Опубликовать
          </button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
