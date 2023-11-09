import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const RadialChart = ({ radialData = [] }) => {
  const [radial, setRadial] = useState([]);
  const [chartData, setChartData] = useState({});
  useEffect(() => {
    console.log(radialData);
    setRadial(radialData);
  }, []);
  useEffect(() => {
    if (radial.length === 0) return;

    const radial1 = radial[0];
    const radial2 = radial[1];
    const totalSales = radial1.sales + radial2.sales;
    const radial1P = +((radial1.sales / totalSales) * 100).toFixed(0);
    const radial2P = +((radial2.sales / totalSales) * 100).toFixed(0);
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
        labels: [radial1.code, radial2.code]
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
