import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosIsntance from 'src/utils/lib/axios';
import { addDays, format } from 'date-fns';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import CustomCheckBox from 'src/components/CustomCheckBox';

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
  const [activities, setActivities] = useState([]);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const [showDate, setShowDate] = useState(false);
  const [currency, setCurrency] = useState('yevro');
  let token = localStorage.getItem('access_token');
  const [date, setDate] = useState({
    from: new Date(Date.now()),
    to: addDays(Date.now(), 4),
  });
  const { register, handleSubmit } = useForm();
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
    let hotel = {};
    hotel.name = data.hotel_name;
    hotel.stars = data.hotel_stars;
    hotel.link = data.hotel_link;
    data.starting_date = format(date.from, 'yyyy-MM-dd');
    data.ending_date = format(date.to, 'yyyy-MM-dd');
    data.images = images;
    data.city_to = choosenCity.id;
    data.city_from = cityFly.id;
    delete data.hotel_name;
    delete data.hotel_stars;
    delete data.hotel_link;
    console.log(hotel);
    data.activities = Array.from(new Set(activities));
    data.options = Array.from(new Set(options));
    console.log(data);
    try {
      let { data: hotelId } = await axiosIsntance.post(
        '/admin/agency/hotels/create/',
        hotel,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (hotelId) {
        data.hotels = [hotelId?.data?.id];
      }
    } catch (error) {
      console.log(error);
    }
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
    console.log(e.target.checked);
  };
  return (
    <>
      <form
        className="space-y-8 w-[600px] mx-auto mt-5"
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

          <div className="flex gap-[60px]  items-end justify-between">
            <div className=" w-full">
              <label
                htmlFor="hotel"
                className="font-[500] text-[14px] text-text"
              >
                Отель<span className="text-[#fa0000]">*</span>
              </label>

              <input
                id="hotel"
                placeholder="Название отеля"
                {...register('hotel_name')}
                className="outline-none mt-3 text-[#0042804D] bg-[#EDF2F6]  w-full border border-[#D1DCE5] p-2 py-3 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="stars"
                className="font-[500] text-[14px] text-text"
              >
                Сколько звезд<span className="text-[#fa0000]">*</span>
              </label>
              <div className="relative items-center  mt-3 bg-[#EDF2F6] py-3 border-[#D1DCE5] px-[10px] border rounded-lg">
                <select
                  name="starts"
                  id="stars"
                  {...register('hotel_stars')}
                  className="text-[14px] w-[170px] bg-transparent font-[500] text-[#0042804D] outline-none  appearance-none "
                >
                  <option value="5" className="options">
                    5 звезд
                  </option>
                  <option value="4" className="options">
                    4 звезд
                  </option>
                  <option value="3" className="options">
                    3 звезд
                  </option>
                  <option value="2" className="options">
                    2 звезд
                  </option>
                  <option value="1" className="options">
                    1 звезд
                  </option>
                </select>
                <span className="absolute right-2 font-[700] top-5 text-text">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="hotel_link"
              className="font-[500] text-[14px] text-text"
            >
              Ссылка на отель
            </label>
            <input
              type="url"
              name=""
              id="hotel_link"
              placeholder="Ссылка"
              className="w-full  mt-3 outline-none py-3 p-2 rounded-lg bg-[#EDF2F6] border border-[#D1DCE5]"
            />
          </div>
          <input type="url" placeholder="" />
          <h3 className="text-[18px] text-text font-semibold my-3">
            Включает в себя
          </h3>
          <div className="flex flex-col gap-3">
            <CustomCheckBox
              id="git"
              label="Гид"
              onCheckboxChange={handleCheckboxChange}
            />
            <CustomCheckBox
              id="ticket"
              label="Авиабилеты"
              onCheckboxChange={handleCheckboxChange}
            />
            <CustomCheckBox
              id="insurance"
              label="Страховка"
              onCheckboxChange={handleCheckboxChange}
            />
          </div>
          <h3 className="text-[18px] text-text font-semibold my-3">
            Доступные планы питания
          </h3>
          <div className="flex flex-col gap-3">
            <CustomCheckBox
              id="all"
              label="Все включено"
              onCheckboxChange={handleCheckboxChange}
            />
            <CustomCheckBox
              id="breakfast"
              label="Завтрак включен в стоимость проживания"
              onCheckboxChange={handleCheckboxChange}
            />
            <CustomCheckBox
              id="insurance"
              label="Обед включен в стоимость проживания"
              onCheckboxChange={handleCheckboxChange}
            />
            <CustomCheckBox
              id="insurance"
              label="Ужин включен в стоимость проживания"
              onCheckboxChange={handleCheckboxChange}
            />
          </div>
          <h3 className="text-[18px] text-text font-semibold my-3">Удобства</h3>
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <CustomCheckBox
                id="swim"
                label="Бассейн"
                onCheckboxChange={handleCheckboxChange}
              />
              <CustomCheckBox
                id="sofa"
                label="Спа"
                onCheckboxChange={handleCheckboxChange}
              />
              <CustomCheckBox
                id="sea"
                label="Вид на океан"
                onCheckboxChange={handleCheckboxChange}
              />
              <CustomCheckBox
                id="enjoy"
                label="Гидромассажная ванна"
                onCheckboxChange={handleCheckboxChange}
              />
              <CustomCheckBox
                id="pets"
                label="Возможно размещение с домашними животными"
                onCheckboxChange={handleCheckboxChange}
              />
              <CustomCheckBox
                id="conditsaner"
                label="Кондиционер"
                onCheckboxChange={handleCheckboxChange}
              />
              <CustomCheckBox
                id="train"
                label="Тренажерный зал"
                onCheckboxChange={handleCheckboxChange}
              />
              <CustomCheckBox
                id="trasnfer"
                label="Трансфер от /до аэропорта включен в стоимость"
                onCheckboxChange={handleCheckboxChange}
              />
            </div>
            <div className="flex flex-col gap-3">
              <CustomCheckBox
                id="all"
                label="Все включено"
                onCheckboxChange={handleCheckboxChange}
              />
              <CustomCheckBox
                id="breakfast"
                label="Завтрак включен в стоимость проживания"
                onCheckboxChange={handleCheckboxChange}
              />
              <CustomCheckBox
                id="insurance"
                label="Обед включен в стоимость проживания"
                onCheckboxChange={handleCheckboxChange}
              />
              <CustomCheckBox
                id="insurance"
                label="Ужин включен в стоимость проживания"
                onCheckboxChange={handleCheckboxChange}
              />
            </div>
          </div>
          <div className="flex justify-between items-center my-5">
            <h2 className="text-[18px] text-text font-[600]">Фото</h2>
            <p className="text-[14px] font-[500] text-text">
              Первое фото будет на обложке объявления
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {array.map((item) => {
              return (
                <div
                  className={`w-[180px] h-[150px] gap-3 flex item-center mx-auto justify-center flex-col text-center ${
                    item.id == 1 && !item.src ? 'bg-[#F9E3C2]' : 'bg-[#F2F4F5]'
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
                    <p className="underline">Add photo </p>
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
      </form>
    </>
  );
};

export default PostForm;
