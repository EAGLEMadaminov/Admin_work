import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { LineChartData } from 'src/utils/util/fakeData';
const YearStatistics = () => {
  const options = {};
  return (
    <div className="w-[35vw] my-5  border p-5 rounded-[15px] bg-[#F7F9FB]">
      <h2 className="text-text font-[600] mb-5">Curve chart</h2>
      <Line options={options} data={LineChartData} />
    </div>
  );
};

export default YearStatistics;
