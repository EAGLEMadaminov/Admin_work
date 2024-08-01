import { useState } from 'react';
import CustomCheckBox from './CustomCheckBox';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { Facilities } from 'src/utils/util/fakeData';
import axiosIsntance from '../utils/lib/axios';
import { useDispatch } from 'react-redux';
import { getHotels } from '../redux/slices/post';

const HotelForm = () => {
  const [selectAllMeals, setSelectAllMeals] = useState(false);
  const [showOptions, setShowOptions] = useState({ id: -1, show: false });
  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, getValues, control } = useForm({
    defaultValues: {
      fields: [
        {
          hotel: '',
          hotel_star: 5,
          hotel_price: '',
          dining_plans: {
            breakfast: false,
            dinner: false,
            night_dinner: false,
          },
          amenities: Facilities.reduce((acc, facility) => {
            acc[facility.label] = false;
            return acc;
          }, {}),
        },
      ],
    },
  });

  const toggleCheckboxes = (index) => {
    const currentValues = getValues(`fields[${index}]`);
    const newValue = !currentValues.breakfast;
    setValue(`fields[${index}].dining_plans.breakfast`, newValue);
    setValue(`fields[${index}].dining_plans.dinner`, newValue);
    setValue(`fields[${index}].dining_plans.night_dinner`, newValue);
    setSelectAllMeals(newValue);
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });
  const hotelCreateBtn = async (data) => {
    let token = localStorage.getItem('access_token');
    // Iterate over each field
    const hotels = data.fields.map((field, index) => {
      const hotel = {
        name: field.hotel,
        price: field.hotel_price,
        url: field.url,
        stars: field.hotel_star,
      };

      // Get selected dining plans with their indices
      hotel.dining_plans = getSelectedDiningPlanIndices(field);

      // Get selected amenities with their indices
      hotel.amenities = getSelectedAmenityIndices(field);
      hotel.post = index + 1;
      return hotel;
    });
    dispatch(getHotels(hotels));
    // try {
    //   const { data } = await axiosIsntance.post('/package/hotels/', hotels[0], {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   if (data) {
    //     console.log(data);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const getSelectedDiningPlanIndices = (field) => {
    const diningPlanKeys = Object.keys(field.dining_plans);
    return diningPlanKeys
      .map((key, index) => (field.dining_plans[key] ? index + 1 : -1))
      .filter((index) => index !== -1);
  };

  const getSelectedAmenityIndices = (field) => {
    const amenityKeys = Object.keys(field.amenities);
    return amenityKeys
      .map((key, index) => (field.amenities[key] ? index + 1 : -1))
      .filter((index) => (index = index + 1));
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(hotelCreateBtn)}>
        {' '}
        {/* //   Hotel  \\ */}
        {fields.map((field, index) => {
          return (
            <div
              key={field.id + index}
              className="hotels my-5 bg-[#EDF2F6] p-5 rounded-xl"
            >
              <div className="flex   items-end gap-[20px] justify-between">
                <div className="mt-3 w-full">
                  <label
                    htmlFor="hotel"
                    className="font-[500] text-[14px] text-text"
                  >
                    Отель<span className="text-[#fa0000]">*</span>
                  </label>

                  <input
                    id="hotel"
                    placeholder="Название отеля"
                    {...register(`fields[${index}].hotel`, { required: true })}
                    className="outline-none mt-3   w-full border border-[#D1DCE5] p-2 py-3 rounded-lg"
                  />
                </div>
                <div className="flex flex-col w-[170px]">
                  <label
                    htmlFor="stars"
                    className="font-[500] text-[14px] text-text"
                  >
                    Цена<span className="text-[#fa0000]">*</span>
                  </label>
                  <div className="relative flex w-full items-center  mt-3 bg-white py-3 border-[#D1DCE5] px-[10px] border rounded-lg">
                    <input
                      id="hotel_price"
                      placeholder="Сумма"
                      type="number"
                      {...register(`fields[${index}].hotel_price`, {
                        required: true,
                      })}
                      className="outline-none no-spinners w-full rounded-lg"
                    />
                    <span className="text-text font-[600]">$</span>
                  </div>
                </div>
              </div>
              <div className="flex   items-end gap-[20px] justify-between">
                <div className="mt-3 w-full">
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
                    {...register(`fields[${index}].url`, { required: true })}
                    placeholder="Ссылка"
                    className="w-full  mt-3 outline-none py-3 p-2 rounded-lg border border-[#D1DCE5]"
                  />
                </div>
                <div className="flex flex-col w-[170px]">
                  <label
                    htmlFor="stars"
                    className="font-[500] text-[14px] text-text"
                  >
                    Сколько звезд<span className="text-[#fa0000]">*</span>
                  </label>
                  <div className="relative flex items-center justify-between  mt-3 bg-white py-3 border-[#D1DCE5] px-[10px] border rounded-lg">
                    <select
                      {...register(`fields[${index}].hotel_star`)}
                      className="appearance-none absolute outline-none px-2 w-[80%]"
                    >
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                    <span className="z-[5] ml-5">
                      <svg
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.3"
                          d="M5.24078 8.9948L1.7765 6.47786H6.05858C6.34018 6.47786 6.58975 6.29654 6.67677 6.02873L8 1.95623L9.32323 6.02873L9.75121 5.88967L9.32323 6.02873C9.41025 6.29654 9.65982 6.47786 9.94142 6.47786H14.2235L10.7592 8.9948L11.0237 9.35886L10.7592 8.99481C10.5314 9.16033 10.4361 9.45371 10.5231 9.72152L11.8463 13.794L8.38206 11.2771C8.15424 11.1116 7.84576 11.1116 7.61794 11.2771L4.15367 13.794L5.4769 9.72153C5.56392 9.45371 5.46859 9.16032 5.24078 8.99481L4.97627 9.35886L5.24078 8.9948Z"
                          fill="#1F4382"
                          stroke="#1F4382"
                          strokeWidth="0.9"
                        />
                      </svg>
                    </span>
                    <span
                      className="absolute right-2 cursor-pointer"
                      onClick={() => {
                        document
                          .getElementsByName(`fields[${index}].number`)[0]
                          .focus();
                        document
                          .getElementsByName(`fields[${index}].number`)[0]
                          .click();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
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

              <h2 className="text-text text-[14px] my-3 font-[500]">
                Дополнительно<span className="text-[#fa0000]">*</span>
              </h2>

              <div className="bg-white  border  rounded-[10px]">
                <div
                  onClick={() =>
                    setShowOptions({
                      ...showOptions,
                      id: index,
                      show: !showOptions.show,
                    })
                  }
                  className="flex justify-between border-b pt-5 items-center"
                >
                  <p className="text-[14px] pl-5 font-[500] text-[#B3C6D9]  w-full pb-2">
                    Выберите примущества
                  </p>
                  {!(showOptions.id === index && showOptions.show) ? (
                    <button className="flex text-[14px] font-[500] text-[#B3C6D9] justify-between pb-2 gap-3 pr-5 items-center">
                      Изменить
                      <span>
                        <svg
                          width="20"
                          height="19"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.2485 2.6697H4.50975C2.93947 2.6697 1.6665 3.94263 1.6665 5.51286V14.9901C1.6665 16.5604 2.93947 17.8333 4.50975 17.8333H13.9872C15.5575 17.8333 16.8305 16.5604 16.8305 14.9901L16.8305 10.2515M6.40525 13.0946L9.85347 12.3998C10.0365 12.363 10.2046 12.2728 10.3366 12.1407L18.0558 4.4176C18.4259 4.04731 18.4256 3.4471 18.0552 3.07712L16.42 1.44383C16.0498 1.07401 15.4498 1.07426 15.0799 1.44439L7.35992 9.16834C7.22817 9.30016 7.13821 9.46789 7.10129 9.65056L6.40525 13.0946Z"
                            stroke="#004280"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  ) : (
                    ''
                  )}
                </div>
                {showOptions.id === index && showOptions.show ? (
                  <div className="p-5">
                    <h3 className="text-[18px] text-text font-semibold mb-3">
                      Доступные планы питания
                    </h3>
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => toggleCheckboxes(index)}
                        className="flex items-center gap-3 ml-2 "
                      >
                        {selectAllMeals ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="0.5"
                              y="0.5"
                              width="19"
                              height="19"
                              rx="5.5"
                              fill="white"
                            />
                            <rect
                              x="0.5"
                              y="0.5"
                              width="19"
                              height="19"
                              rx="5.5"
                              stroke="#FF9B06"
                            />
                            <path
                              d="M14.6668 6.5L8.25016 12.9167L5.3335 10"
                              stroke="#FF9B06"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <div className="w-5 h-5 block border rounded-[6px] flex-shrink-0 border-[#D0D5DD]"></div>
                        )}
                        <span className="text-[14px] font-[500] text-[#1B2126]">
                          Все включено
                        </span>
                      </button>
                      <Controller
                        name={`fields[${index}].dining_plans.breakfast`}
                        control={control}
                        render={({ field }) => (
                          <CustomCheckBox
                            checked={field.value}
                            onChange={field.onChange}
                            label="Завтрак включен в стоимость проживания"
                          />
                        )}
                      />
                      <Controller
                        name={`fields[${index}].dining_plans.dinner`}
                        control={control}
                        render={({ field }) => (
                          <CustomCheckBox
                            checked={field.value}
                            onChange={field.onChange}
                            label="Обед включен в стоимость проживания"
                          />
                        )}
                      />
                      <Controller
                        name={`fields[${index}].dining_plans.night_dinner`}
                        control={control}
                        render={({ field }) => (
                          <CustomCheckBox
                            checked={field.value}
                            onChange={field.onChange}
                            label="Ужин включен в стоимость проживания"
                          />
                        )}
                      />
                    </div>
                    <h3 className="text-[18px] text-text font-semibold my-3">
                      Удобства
                    </h3>
                    <div className="flex justify-between flex-col">
                      {Facilities.map((item) => {
                        return (
                          <div
                            className="w-1/2 my-1"
                            key={`${item.id + index}`}
                          >
                            <Controller
                              name={`fields[${index}].amenities.${item.label}`}
                              control={control}
                              render={({ field }) => (
                                <CustomCheckBox
                                  checked={field.value}
                                  onChange={field.onChange}
                                  label={item.text}
                                />
                              )}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="flex justify-between">
                {index > 0 ? (
                  <button
                    type="button"
                    className="py-[10px] px-4 rounded-[8px] bg-[#F40202] text-white mt-3"
                    onClick={() => remove(index)}
                  >
                    Удалить
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        })}
        <button
          onClick={handleSubmit(hotelCreateBtn)}
          className="py-[10px] px-4 rounded-[8px] bg-text text-white mt-3"
        >
          Отправка
        </button>
        <button
          type="button"
          className="py-[10px] flex items-center gap-2 mt-5 px-4 rounded-[8px] text-[14px] font-[600] border"
          onClick={() => append({ text: '', number: 1 })}
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-lg text-black"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
              />
            </svg>
          </span>{' '}
          Добавить отель
        </button>
      </form>{' '}
    </div>
  );
};

export default HotelForm;
