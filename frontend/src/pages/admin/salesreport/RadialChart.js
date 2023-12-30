import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialChart = ({ radialData }) => {
  const [radial, setRadial] = useState(null);
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    setRadial(radialData);
  }, [radialData]);
  useEffect(() => {
    if (!radial) return;

    const totalSales = radial.amount + radial.qty;

    const radial1P = ((radial.amount / totalSales) * 100).toFixed(0);
    const radial2P = ((radial.qty / totalSales) * 100).toFixed(0);
    const newChart = {
      series: [radial1P, radial2P],
      options: {
        chart: {
          height: 295,
          type: 'radialBar'
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '16px'
              },
              value: {
                fontSize: '12px'
              },
              total: {
                show: false,
                label: 'Total',
                formatter: function (w) {
                  return 249;
                }
              }
            }
          }
        },
        labels: [`Earnings: ${radial.amount}`, `Total Quantity: ${radial.qty}`],
        legend: {
          show: true
        }
      }
    };
    setChartData(newChart);
  }, [radial]);
  return (
    <div id="chart">
      {Object.keys(chartData).length > 0 && (
        <ReactApexChart options={chartData?.options} series={chartData?.series} type="radialBar" height={295} />
      )}
    </div>
  );
};

export default RadialChart;
