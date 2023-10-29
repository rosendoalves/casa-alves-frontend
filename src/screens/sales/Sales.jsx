import React, { useEffect, useState } from "react";
import money from "../../components/assets/money.jpg";
import { Line } from "react-chartjs-2";
import { getTickets } from "../../api/ticketApi";
import useToken from "../../hooks/useToken";
import Loading from "../../components/spinner/Loading";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { formatDate } from "../../utils/format";

export const Data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

Chart.register(CategoryScale);
const Sales = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const { token } = useToken();

  useEffect(() => {
    getTickets(token).then((res) => {
      setTickets(res.payload);
      setLoading(false);
    });
  }, [loading]);

  const chartData = {
    labels: tickets?.map((data) => formatDate(data.createdAt)),
    datasets: [
      {
        label: "Ventas realizadas",
        data: tickets?.map((data) => data.total),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Ventas realizadas",
      },
      legend: {
        display: false,
      },
    },
    scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'MMM D',
            },
          },
          title: {
            display: true,
            text: 'Fecha',
          },
        },
      },
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="container text-center mt-2">
      {tickets.length > 0 && <Line data={chartData} options={chartOptions} />}
      <img src={money} className="img-fluid" />
    </div>
  );
};

export default Sales;
