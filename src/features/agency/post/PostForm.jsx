import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axiosIsntance from "src/utils/lib/axios";
import axios from "axios";
import { addDays, format } from "date-fns";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const PostForm = () => {
  const [countryList, setCountryList] = useState([]);
  const [showCountries, setShowCountries] = useState(false);
  const [choosenCountry, setChoosenCountry] = useState("");
  const [cityList, setCityList] = useState([]);
  const [showCities, setShowCities] = useState(false);
  const [choosenCity, setChoosenCity] = useState("");
  const [cityFly, setCityFly] = useState("");
  const [showCityFly, setShowCityFly] = useState(false);
  const [flyCityList, setFlyCityList] = useState([]);
  const [images, setImages] = useState([]);
  // const city1Ref = useRef(null);
  const city2Ref = useRef(null);
  let token = localStorage.getItem("access_token");
  const [date, setDate] = useState({
    from: new Date(Date.now()),
    to: addDays(Date.now(), 4),
  });
  const { register, handleSubmit } = useForm();
  const [array, setArray] = useState([
    { id: 1, src: "", islast: false },
    { id: 2, src: "", islast: false },
    { id: 3, src: "", islast: false },
    { id: 4, src: "", islast: false },
    { id: 5, src: "", islast: false },
    { id: 6, src: "", islast: false },
    { id: 7, src: "", islast: false },
    { id: 8, src: "", islast: false },
  ]);

  const handleImageChange = async (e, id) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    try {
      let { data: imageId } = await axiosIsntance.post(
        "/image-upload/",
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
    console.log(array);
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
    setDate({ from: new Date(e[0]), to: new Date(e[1]) });
  };

  const handleFormSubmit = async (data) => {
    console.log(images);
    let hotel = {};
    hotel.name = data.hotel_name;
    hotel.stars = data.hotel_stars;
    hotel.link = data.hotel_link;
    try {
      let { data: hotelId } = await axiosIsntance.post(
        "/admin/agency/hotels/create/",
        hotel,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (hotelId) {
        console.log(hotelId);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(cityFly);
    console.log("ok");
    console.log(data);
  };

  return (
    <>
      <form
        className="space-y-8 w-[800px] mx-auto mt-5"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex justify-between">
          <h2 className="text-[30px] text-[#101828] leading-[38px]">
            Post yaratish
          </h2>
          <button
            type="submit"
            className=" bg-[#7F56D9] rounded-lg px-3 text-white"
          >
            Yaratish
          </button>
        </div>
        <div className="ml-5">
          <h4 className="text-[24px] font-[600] mb-3 text-[#101828]">
            Tour packet ma&apos;lumotlari
          </h4>
          <label
            htmlFor="tour_name"
            className="font-[400] text-[18px] text-[#0F2E33]"
          >
            Nomi
          </label>
          <input
            id="tour_name"
            placeholder="New york trip"
            {...register("title", { required: true })}
            required
            className="border w-full p-2 mt-1 mb-5 rounded-lg border-[#000]"
          />

          <div className="relative">
            <label
              htmlFor="country"
              className="font-[400] text-[18px] text-[#0F2E33]"
            >
              Davlat
            </label>
            <input
              type="search"
              id="country"
              placeholder="Davlat nomini kiriting"
              {...register("country", { required: true })}
              className="border w-full p-2 mt-1 mb-5 rounded-lg border-[#000]"
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
              ""
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="city"
              className="font-[400] text-[18px] text-[#0F2E33]"
            >
              Shahar
            </label>
            <input
              type="search"
              id="city"
              {...register("city_to", { required: true })}
              // ref={city1Ref}
              className="border border-[#000] w-full p-2  mt-1 mb-5 rounded-lg"
              placeholder="Borish shahrini kiriting"
              onChange={handleChooseCity}
              value={choosenCity}
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
                      {city}
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="fly_city"
              className="font-[400] text-[18px] text-[#0F2E33]"
            >
              Uchish shahri
            </label>
            <input
              id="fly_city"
              className="border border-[#000] w-full p-2 mt-1 mb-5 rounded-lg"
              placeholder="Uchish shahrini kiriting"
              // ref={city2Ref}
              {...register("city_from", { required: true })}
              onChange={handleFlyCityBtn}
              value={cityFly}
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
                      {item}
                    </li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </div>
          <h2 className="text-[24px] font-[600]">Sayohat vaqtini kiriting</h2>
          <div className="relative  mt-3 mb-3">
            <div className="flex gap-14 ">
              <p>Jo&apos;nash sanasi</p>
              <p className="ml-2">Qaytish sanasi</p>
            </div>
            <div className="flex gap-2 mt-4">
              <p className="flex items-center gap-2 ml-2">
                {format(date.from, "dd LLLL, yyyy")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-calendar4"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                </svg>
              </p>
              <DateRangePicker
                className="absolute w-full h-[100%]  opacity-0 "
                onChange={handleDatePicker}
              />
              <p className="flex items-center gap-2">
                {format(date.to, "dd LLLL, yyyy")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-calendar4"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                </svg>
              </p>
            </div>
          </div>

          <div className="mt-5 mb-5">
            <label
              htmlFor="tour_price"
              className="font-[400] text-[#0F2E33] text-[18px] "
            >
              Sayohat narxi 1 kishi uchun
            </label>
            <div className="mt-3">
              <input
                placeholder="1,600,000"
                className="outline-none w-[50%] border border-[#000] p-2 rounded-lg"
                type="number"
                {...register("price", { required: true })}
                id="tour_price"
              />
              <select {...register("price_for")}>
                <option value="sum">sum</option>
                <option value="euro">euro</option>
                <option value="dollar">dollar</option>
              </select>
            </div>
          </div>

          <label
            htmlFor="hotel"
            className="font-[400] text-[#0F2E33] text-[18px]"
          >
            Mehmonxona
          </label>
          <div className="flex gap-4">
            <input
              id="hotel"
              placeholder="Hilton, Tashkent, Uzbekistan"
              {...register("hotel_name")}
              className="w-full border border-[#000] p-2 mt-3 rounded-lg"
            />
            <input
              id="hotel"
              placeholder="Ko'rish uchun link"
              {...register("hotel_link")}
              className="w-full border border-[#000] p-2 mt-3 rounded-lg"
            />
          </div>
          <div className="flex items-center mt-5 gap-1">
            <label htmlFor="stars">Mehmonxona yulduzli</label>
            <select
              name="starts"
              id="stars"
              {...register("hotel_stars")}
              className="appearance-none w-[30px] text-center underline "
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-star-fill text-yellow-400"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </div>
          <h3 className="text-[18px] font-semibold my-3">
            Qo&apos;shimcha afzalliklar
          </h3>
          <div className="flex gap-3 items-center">
            <label htmlFor="umra">Umra</label>
            <input
              id="umra"
              {...register("umra")}
              type="checkbox"
              className="w-4 h-4"
            />
            <label htmlFor="nature">Tabiat</label>
            <input
              className="w-4 h-4"
              type="checkbox"
              id="nature"
              {...register("nature")}
            />
            <label htmlFor="ocean">Dengiz</label>
            <input
              className="w-4 h-4"
              type="checkbox"
              id="ocean"
              {...register("ocean")}
            />
            <label htmlFor="museum">Muzeyga sayohat</label>
            <input
              className="w-4 h-4"
              type="checkbox"
              id="museum"
              {...register("museum")}
            />
          </div>
          <h2 className="text-[24px] text-[#101828] font-[600] mt-5">
            Rasmlar
          </h2>
          <p className="mt-3 mb-1">Birinchi rasm sarlavhaga qo&apos;yiladi</p>
          <div className="flex flex-wrap gap-2">
            {array.map((item) => {
              return (
                <div
                  className={`w-[180px] h-[150px] gap-3 flex item-center mx-auto justify-center flex-col text-center ${
                    item.id == 1 && !item.src ? "bg-[#F9E3C2]" : "bg-[#F2F4F5]"
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
          <h1>O&apos;z ichiga oladi</h1>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <input
                id="avia"
                type="checkbox"
                {...register("ticket")}
                className="w-4 h-4"
              />
              <label htmlFor="avia">Avia bilet</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="transport"
                type="checkbox"
                className=" w-4 h-4"
                {...register("transport")}
              />
              <label htmlFor="transport">Transport</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="insurance"
                type="checkbox"
                className=" w-4 h-4"
                {...register("insurance")}
              />
              <label htmlFor="insurance">Tibbiy sug'urta</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="viza"
                type="checkbox"
                className=" w-4 h-4"
                {...register("viza")}
              />
              <label htmlFor="viza">Rasmiy viza</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="meal"
                type="checkbox"
                className=" w-4 h-4"
                {...register("meal")}
              />
              <label htmlFor="meal">Taom (2-3) mahal</label>
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="comment">Qo&apos;shimcha ma&apos;lumot</label>
            <textarea
              id="comment"
              placeholder="Qo'shumcha ma'lumot kiriting"
              className="border mt-1 border-[#222] w-full p-2 rounded-lg bg-[#F3F4F5] active:bg-white"
              cols="30"
              {...register("comment")}
              rows="3"
            ></textarea>
          </div>
        </div>
        <Link className="block text-right text-[#7F56D9]">Forgot password</Link>
      </form>
    </>
  );
};

export default PostForm;
