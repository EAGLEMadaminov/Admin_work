import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axiosIsntance from "src/utils/lib/axios";
import { useNavigate } from "react-router-dom";
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
  const [date, setDate] = useState({
    from: new Date(Date.now()),
    to: addDays(Date.now(), 4),
  });

  const [array, setArray] = useState([
    { id: 1, src: "", islast: false },
    { id: 2, src: "", islast: false },
    { id: 3, src: "", islast: false },
    { id: 4, src: "", islast: false },
    { id: 5, src: "", islast: false },
    { id: 6, src: "", islast: false },
  ]);

  const navigate = useNavigate();

  const handleImageChange = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        array.forEach((item) => {
          if (item.id == id) {
            item.src = reader.result;
            return item;
          }
          return item;
        });
        console.log(array);
        setArray(array);
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
    const value = `/city/?city=${e.target.value}`;
    const res = await searchFunction(value);
    if (res) {
      setShowCities(true);
      setCityList(res.city_list);
    }
  };

  const handleFlyCityBtn = async (e) => {
    setCityFly(e.target.value);
    const value = `/city/?city=${e.target.value}`;
    const res = await searchFunction(value);
    if (res) {
      setShowCityFly(true);
      setFlyCityList(res.city_list);
    }
  };

  const handleDatePicker = (e) => {
    setDate({ from: new Date(e[0]), to: new Date(e[1]) });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.agency = e.target[1].value;
    data.country = e.target[2].value;
    data.city_from = e.target[3].value;
    data.city_to = e.target[4].value;
    data.price = e.target[9].value;
    data.starting_date = format(date.from, "yyyy-MM-dd");
    data.hotel = e.target[11].value;
    data.price_hotel = e.target[12].value;
    data.ending_date = format(date.to, "yyyy-MM-dd");
    console.log(data);
  };

  return (
    <>
      <form
        className="space-y-8 w-[800px] mx-auto mt-5"
        onSubmit={handleFormSubmit}
      >
        <div className="flex justify-between">
          <h2 className="text-[30px] text-[#101828] leading-[38px]">
            Creating post
          </h2>
          <button
            type="submit"
            className=" bg-[#7F56D9] rounded-lg px-3 text-white"
          >
            Create
          </button>
        </div>
        <div className="ml-5">
          <h4 className="text-[24px] font-[600] mb-3 text-[#101828]">
            Describe details
          </h4>
          <label
            htmlFor="tour_name"
            className="font-[400] text-[18px] text-[#0F2E33]"
          >
            Tour package name
            <input
              id="tour_name"
              placeholder="New york trip"
              required
              className="border w-full p-2 mt-1 mb-5 rounded-lg border-[#000]"
            />
          </label>
          <div className="relative">
            <label
              htmlFor="country"
              className="font-[400] text-[18px] text-[#0F2E33]"
            >
              Country
              <input
                type="search"
                id="country"
                placeholder="Enter country name"
                className="border w-full p-2 mt-1 mb-5 rounded-lg border-[#000]"
                value={choosenCountry}
                required
                onChange={handleSearchCountryBtn}
              />
            </label>

            {countryList.length > 0 && showCountries ? (
              <ul className="border z-20 bg-white absolute p-2 w-full rounded-lg shadow-2xl top-[70px] border-[#000]">
                {countryList.map((item, index) => {
                  return (
                    <li
                      onClick={() => {
                        setChoosenCountry(item), setShowCountries(false);
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
              City
            </label>
            <input
              type="search"
              id="city"
              className="border border-[#000] w-full p-2  mt-1 mb-5 rounded-lg"
              placeholder="Enter city name"
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
                        setChoosenCity(city), setShowCities(false);
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
              Fly city
            </label>
            <input
              id="fly_city"
              className="border border-[#000] w-full p-2 mt-1 mb-5 rounded-lg"
              placeholder="Enter your live city"
              onChange={handleFlyCityBtn}
              value={cityFly}
            />

            {flyCityList.length > 0 && showCityFly ? (
              <ul className="absolute z-20 shadow-2xl border border-[#000] w-full p-2 rounded-lg  top-[70px] bg-white">
                {flyCityList.map((city, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setCityFly(city), setShowCityFly(false);
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
          <h2 className="text-[24px] font-[600]">Enter the date of travel</h2>
          <div className="relative  mt-3 mb-3">
            <div className="flex gap-14 ">
              <p>Move date</p>
              <p className="ml-2">Return date</p>
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
              htmlFor="hotel_price"
              className="font-[400] text-[#0F2E33] text-[18px] "
            >
              Enter price for a person
            </label>
            <div className="mt-3">
              <input
                placeholder="1,600,000"
                className="outline-none w-[50%] border border-[#000] p-2 rounded-lg"
                type="number"
                id="hotel_price"
              />
              <select>
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
            Hotel
          </label>
          <input
            id="hotel"
            placeholder="Hilton, Tashkent, Uzbekistan"
            className="w-full border border-[#000] p-2 mt-3 rounded-lg"
          />

          <div className="mt-5">
            <label
              htmlFor="hotel_price"
              className="font-[400] text-[#0F2E33] text-[18px] "
            >
              Enter price for a person
            </label>
            <div className="mt-3">
              <input
                placeholder="1,600,000"
                className="outline-none w-[50%] border border-[#000] p-2 rounded-lg"
                type="number"
                id="hotel_price"
              />
              <select>
                <option value="sum">sum</option>
                <option value="euro">euro</option>
                <option value="dollar">dollar</option>
              </select>
            </div>
          </div>
          <h2 className="text-[24px] text-[#101828] font-[600] mt-5">Photos</h2>
          <p className="mt-3 mb-1">
            The first photo will be on the cover of the ad.
          </p>
          <div className="flex flex-wrap justify-between">
            {array.map((item) => {
              return (
                <div
                  className={`w-[250px] h-[200px] flex item-center justify-center flex-col text-center ${
                    item.id == 1 && !item.src ? "bg-[#F9E3C2]" : ""
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
                    <img src={item.src} />
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
          <h1>Filter</h1>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <input
                id="umra"
                placeholder="New york trip"
                type="checkbox"
                className="w-4 h-4"
              />
              <label htmlFor="umra">Umra</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                placeholder="New york trip"
                type="checkbox"
                className="w-4 h-4"
              />
              <label htmlFor="avia">Avia bilet</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                placeholder="New york trip"
                type="checkbox"
                className=" w-4 h-4"
              />
              <label htmlFor="transport">Transport</label>
            </div>
          </div>
        </div>
        <Link className="block text-right text-[#7F56D9]">Forgot password</Link>
      </form>
    </>
  );
};

export default PostForm;
