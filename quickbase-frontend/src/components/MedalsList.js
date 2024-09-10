import React, { useEffect, useState } from "react";
import { getMedals } from "../api/quickbase";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./MedalsList.css"; // Import the CSS file

const MedalsList = () => {
  const [medals, setMedals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedals = async () => {
      try {
        const data = await getMedals();
        setMedals(data); // Adjust based on your API response structure
      } catch (err) {
        setError("Failed to fetch medals");
      } finally {
        setLoading(false);
      }
    };

    fetchMedals();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Prepare data for Highcharts
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
      text: 'Medal Count by Country',
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
      <h1>Medal Counts by Country</h1>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default MedalsList;
