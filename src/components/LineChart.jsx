import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'    

function LineChart({ coinHistory, currentPrice, coinName }) {
  const coinPrice = [];
  const coinTimeStamp = [];
  for (let i = 0; i < coinHistory.length; i=i+1) {
    coinPrice.push(coinHistory[i].price);
    const modifiedDate = new Date(coinHistory[i].timestamp*1000).toLocaleDateString()
    coinTimeStamp.push(modifiedDate);
  }

  const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: "Price in $",
        data: coinPrice,
        fill: false,
        tension: 0.5,
        borderColor: "DodgerBlue",
        pointRadius: 0,
        // borderWidth: "2px",
        backgroundColor: "transparent", 
        spanGaps: true,
        
      },
    ],
  };

  const options = {
    scales: {
      y: 
        {
          
            beginAtZero: true,
          
        },
      x:
        {
          reverse:true,
        },
      
    },
  };

  return (
    <>
      <div>
        <div>Chart Name : {coinName}</div>
        <Line data={data} options={options} />
      </div>
    </>
  );
}

export default LineChart;
