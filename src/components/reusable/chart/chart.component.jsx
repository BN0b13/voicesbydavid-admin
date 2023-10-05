import React from 'react';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total View Line Chart',
      },
    },
  };
  
  
  const LineChart = (params) => {
    const labels = params.views.map(view => new Date(view.createdAt).toLocaleDateString('en-us', { day:"numeric", year:"numeric", month:"numeric"}));

    
    const data = {
      labels,
      datasets: [
        {
          label: 'Views',
          data: params.views.map(view => view.count),
          borderColor: 'rgb(0, 0, 0)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      ],
    };

    return (
        <Line options={options} data={data} />
    )
}

export default LineChart;