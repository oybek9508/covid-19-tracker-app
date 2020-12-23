import React, { useState, useEffect } from "react";
import styles from "./Chart.module.css";
import { fetchDailyData } from "../../api/index";
import { Line, Bar } from "react-chartjs-2";

function Chart({ data: { confirmed, recovered, deaths }, country }) {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "rgba(0, 0, 255, 0.5)",
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            fill: true,
            pointRadius: 0,
            borderWidth: 8,
          },

          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "rgba(255, 0, 0, 0.5)",
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            fill: true,
            pointRadius: 0,
            borderWidth: 8,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba( 255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Current state in ${country}`,
        },
      }}
    />
  ) : null;
  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
}

export default Chart;