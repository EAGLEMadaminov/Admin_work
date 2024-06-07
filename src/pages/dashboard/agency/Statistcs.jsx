import React from 'react';
import TopCitiesByViewChart from 'src/features/agency/statistics/TopCitiesByViewChart';
import TopFiveCitiesChart from 'src/features/agency/statistics/TopFiveCitiesChart';
import YearStatistics from 'src/features/agency/statistics/YearStatistics';
const Statistcs = () => {
  return (
    <div>
      <TopFiveCitiesChart />
      <div className="flex justify-between">
        <YearStatistics />
        <TopCitiesByViewChart />
      </div>
    </div>
  );
};

export default Statistcs;
