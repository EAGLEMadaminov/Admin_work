import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { barChartData } from 'src/utils/util/fakeData';
const TopFiveCitiesChart = () => {
  const options = {};
  return (
    <div className="w-[calc(100vw-300px)] my-5 h-[500px] border p-5 rounded-[15px] bg-[#F7F9FB]">
      <div className="flex justify-between ">
        <h2 className="text-text font-[600]">Топ-5 направлений</h2>
        <select
          name=""
          id=""
          className="bg-[#FCFDFD] text-[12px] font-[600] text-[#A8ABAD] px-2 rounded-lg"
        >
          <option value="1">Январь</option>
          <option value="2">Февраль</option>
          <option value="3">Март</option>
          <option value="4">Апрель</option>
          <option value="5">Май</option>
          <option value="6">Июнь</option>
          <option value="7">Июль</option>
          <option value="8">Август</option>
          <option value="9">Сентябрь</option>
          <option value="10">Октябрь</option>
          <option value="11">Ноябрь</option>
          <option value="12">Декабрь</option>
        </select>
      </div>
      <Bar options={options} data={barChartData} />
    </div>
  );
};

export default TopFiveCitiesChart;
