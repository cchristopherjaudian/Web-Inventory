import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import ReactApexChart from 'react-apexcharts';
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 2
  },
  grid: {
    strokeDashArray: 0
  }
};

const IncomeAreaChart = ({ salesData = [] }) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);
  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(areaChartOptions);
  useEffect(() => {
    setChartData(salesData);
  }, [salesData]);
  useEffect(() => {
    if (chartData.length === 0) return;
    const cCategories = [];
    const cSeries = [];
    chartData.map((s, i) => {
      cCategories.push(s['name']);
      cSeries.push(s['totalQty']);
    });
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: cCategories,
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary
            ]
          }
        },
        axisBorder: {
          show: true,
          color: line
        },
        tickAmount: 1
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        }
      },
      grid: {
        borderColor: line
      },
      tooltip: {
        theme: 'light'
      }
    }));
    setSeries([
      {
        name: '',
        data: cSeries
      }
    ]);
  }, [chartData]);
  return <ReactApexChart options={options} series={series} type="area" height={250} />;
};

export default IncomeAreaChart;
