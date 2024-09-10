import React, { useEffect, useState } from "react";
import { getMedals } from "../api/quickbase";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import './MedalsList.css';

const MedalsList = ({ dataUpdated, setDataUpdated }) => {
  const [medals, setMedals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedals = async () => {
      try {
        const data = await getMedals();
        setMedals(data);
      } catch (err) {
        setError("Failed to fetch medals");
      } finally {
        setLoading(false);
        setDataUpdated(false);
      }
    };

    fetchMedals();
  }, [dataUpdated, setDataUpdated]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  const countries = ["Canada", "United States", "Germany", "Norway"];
  const medalTypes = ["Gold", "Silver", "Bronze"];

  const getMedalCounts = (medalType, country) => {
    return medals.filter(medal => medal.medal === medalType && medal.country === country).length;
  };

  const chartOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: countries,
      title: {
        text: 'Country',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total Medals',
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: 'normal',
      },
    },
    series: medalTypes.map((medalType) => ({
      name: medalType,
      data: countries.map((country) => getMedalCounts(medalType, country)),
    })),
  };

  return (
    <div className="chart-container">
      <h3>Medal Counts by Country</h3>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default MedalsList;
